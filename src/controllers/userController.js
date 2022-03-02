import User from "../models/User";

// 회원가입 진입 get
export const getJoin = (req, res) => {
    return res.render("join", { pageTitle: "Join" });
}
// 회원갇입 post create
export const postJoin = async (req, res) => {
    const { name, username, email, password, password2, location } = req.body;
    const pageTitle = "Join";
    if (password !== password2) {
        return res.render("join", {
            pageTitle,
            errorMessage: "Password confirmation does not match."
        });
    }
    const exists = await User.exists({ $or: [{ username }, { email }] });
    if (exists) {
        return res.render("join", {
            pageTitle,
            errorMessage: "This username/email is already taken."
        });
    };
    await User.create({
        name,
        username,
        email,
        password,
        location,
    });
    return res.redirect("/login");
}

export const edit = (req, res) => {
    res.send("edit User");
}
export const remove = (req, res) => {
    res.send("remove User");
}
export const login = (req, res) => {
    res.render("login", { pageTitle: "Login" });
}
export const logout = (req, res) => {
    res.send("log out User");
}
export const see = (req, res) => {
    res.send("See User");
}