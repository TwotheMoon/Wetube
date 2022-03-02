import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, required: true, trim: true },
    createdAt: { type: Date, required: true, default: Date.now },
    hashtags: [{ type: String, trim: true }],
    meta: {
        views: { type: Number, default: 0, required: true },
        rating: { type: Number, default: 0, required: true },
    }
});

// DB 세이브 되기직전 미들웨어로 데이터를 조작 하기
videoSchema.static(`formatHashtags`, function (hashtags) {
    return hashtags.split(",").map((word) => !word.trim().startsWith("#") ? `#${word.trim()}` : word.trim());
});

const Video = mongoose.model("Video", videoSchema);

export default Video;