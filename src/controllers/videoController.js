import Video from "../models/Video";

// 홈 뷰 read
export const home = async (req, res) => {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos });
};

// 디테일 뷰 select & read
export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (video === null) {
        return res.render("404", { pageTitle: "Video not Found" });
    }
    return res.render("watch", { pageTitle: video.title, video });
};

// 수정 뷰 get read 
export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (video === null) {
        return res.render("404", { pageTitle: "Video not Found" });
    }
    return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};

// 수정 액션 post update
export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id });
    if (video === null) {
        return res.render("404", { pageTitle: "Video not Found" });
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: hashtags
            .split(",")
            .map((word) => !word.trim().startsWith("#") ? `#${word.trim()}` : word.trim()),
    });
    return res.redirect(`/videos/${id}`);
};

//
export const getUpload = (req, res) => {
    return res.render("upload", { pageTitle: "Upload Video" });
};

// 업로드 post create
export const postUpload = async (req, res) => {
    const { title, description, hashtags } = req.body;
    try {
        await Video.create({
            title,
            description,
            createdAt: Date.now(),
            hashtags: hashtags
                .split(",")
                .map((word) => !word.trim().startsWith("#") ? `#${word.trim()}` : word.trim()),
        });
        return res.redirect("/");
    } catch (error) {
        return res.render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message
        });
    }
};
