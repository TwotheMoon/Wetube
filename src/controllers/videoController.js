export const trending = (req, res) => {
    res.render("home"); // home.pug 랜더
}
export const see = (req, res) => {
    return res.send(`Watch video #${req.params.id}`);
}
export const edit = (req, res) => {
    return res.send("Edit");
}
export const search = (req, res) => {
    res.send("Search");
}
export const upload = (req, res) => {
    res.send("Upload");
}
export const deleteVideo = (req, res) => {
    return res.send("Delete");
}
