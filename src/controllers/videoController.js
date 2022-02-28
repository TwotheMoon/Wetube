export const trending = (req, res) => {
    const videos = [];
    return res.render("home", { pageTitle: "Home", videos }); // home.pug 랜더} 
}
export const see = (req, res) => { return res.render("watch", { pageTitle: "Watch" }); }
export const edit = (req, res) => { return res.render("edit", { pageTitle: "Edit" }); }
export const search = (req, res) => {
    res.send("Search");
}
export const upload = (req, res) => {
    res.send("Upload");
}
export const deleteVideo = (req, res) => {
    return res.send("Delete");
}
