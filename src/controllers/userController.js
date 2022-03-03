import User from "../models/User";
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
    const user = await User.findOne({ username });
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
}
export const logout = (req, res) => {
    res.send("log out User");
};
export const edit = (req, res) => {
    res.send("edit User");
};
export const remove = (req, res) => {
    res.send("remove User");
};
export const see = (req, res) => {
    res.send("See User");
};