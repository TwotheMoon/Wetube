import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

// 회원가입 진입 get
export const getJoin = (req, res) => {
    return res.render("join", { pageTitle: "Join" });
}
// 회원갇입 post create
export const postJoin = async (req, res) => {
    const { name, username, email, password, password2, location } = req.body;
    const pageTitle = "Join";
    if (password !== password2) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match."
        });
    }
    const exists = await User.exists({ $or: [{ username }, { email }] });
    if (exists) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "This username/email is already taken."
        });
    };
    try {
        await User.create({
            name,
            username,
            email,
            password,
            location,
        });
        return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage: error._message
        });
    }
};
// 로그인 get
export const getLogin = (req, res) => {
    res.render("login", { pageTitle: "Login" });
};
export const postLogin = async (req, res) => {
    const { username, password } = req.body;
    const pageTitle = "Login";
    const user = await User.findOne({ username, socialOnly: false });
    if (!user) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "An account with this username does not exists."
        });
    }
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
        return res.status(400).render("login", {
            pageTitle,
            errorMessage: "Wrong password"
        });
    }
    req.session.loggedIn = true;
    req.session.user = user;             // 세션 정보 저장
    return res.redirect("/");
};
// github login 깃허브로 보내기
export const startGithubLogin = (req, res) => {
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl); // 깃허브에서 콜백으로 요청한 주소
};
// 깃허브에서 콜백
export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (await fetch(finalUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
    })).json();
    if ("access_token" in tokenRequest) {
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (await fetch(`${apiUrl}/user`, {
            headers: {
                Authorization: `token ${access_token}`,
            },
        })
        ).json();
        const emailData = await (await fetch(`${apiUrl}/user/emails`, {
            headers: {
                Authorization: `token ${access_token}`,
            },
        })
        ).json();
        // 인증된 이메일 객체 추출
        const emailObj = emailData.find((email) => email.primary === true && email.verified === true);
        if (!emailObj) {
            // 혹은 계정 생성 페이지 리다이렉트
            return res.redirect("/login");
        }
        let user = await User.findOne({ email: emailObj.email });
        if (!user) {      // 깃헙 이메일이 DB에 없다면 깃헙 정보로 회원가입
            user = await User.create({
                avatarUrl: userData.avatar_url,
                name: userData.name,
                username: userData.login,
                email: emailObj.email,
                password: "",
                socialOnly: true,
                location: userData.location,
            });
            // DB에 같은 이메일을 가진 user가 이미 있다면 로그인 
            req.session.loggedIn = true;
            req.session.user = user;
            return res.redirect("/");
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    } else {
        return res.redirect("/login");
    }
};
// 로그아웃
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};
// 프로필 수정
export const getEdit = (req, res) => {
    return res.render("edit-profile", { pageTitle: "Edit Profile" });
}
export const postEdit = (req, res) => {
    return res.render("edit-profile");
}
export const see = (req, res) => res.send("See User");