import Video from "../models/Video";

// 홈 뷰 read
export const home = async (req, res) => {
    const videos = await Video.find({}).sort({ createdAt: "desc" });
    return res.render("home", { pageTitle: "Home", videos });
};

// 디테일 뷰 select & read
export const watch = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (video === null) {
        return res.status(404).render("404", { pageTitle: "Video not Found" });
    }
    return res.render("watch", { pageTitle: video.title, video });
};

// 수정 뷰 get read 
export const getEdit = async (req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if (video === null) {
        return res.status(404).render("404", { pageTitle: "Video not Found" });
    }
    return res.render("edit", { pageTitle: `Edit ${video.title}`, video });
};

// 수정 액션 post update
export const postEdit = async (req, res) => {
    const { id } = req.params;
    const { title, description, hashtags } = req.body;
    const video = await Video.exists({ _id: id });
    if (video === null) {
        return res.status(404).render("404", { pageTitle: "Video not Found" });
    }
    await Video.findByIdAndUpdate(id, {
        title,
        description,
        hashtags: Video.formatHashtags(hashtags),
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
            hashtags: Video.formatHashtags(hashtags),
        });
        return res.redirect("/");
    } catch (error) {
        return res.status(400).render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message
        });
    }
};

// 삭제 get delete
export const deleteVideo = async (req, res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};

// 검색 get
export const search = async (req, res) => {
    const { keyword } = req.query;
    let videos = [];
    if (keyword) {
        videos = await Video.find({
            title: {
                $regex: new RegExp(keyword, "i")
            },
        });
    }
    return res.render("search", { pageTitle: "Search", videos });
};