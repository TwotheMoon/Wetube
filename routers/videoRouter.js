import express from "express";

const videoRouter = express.Router();
const handleWarchVideo = (req, res) => res.send("Watch video");
videoRouter.get("/watch", handleWarchVideo);

export default videoRouter;