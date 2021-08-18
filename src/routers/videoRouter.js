import express from "express"; // node_modules 에서 임포트 (패키지)
import {
    watch, upload, deleteVideo, getEdit, postEdit,
} from "../controllers/videoController";// 내가 만든 폴더에서 함수 임포트

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", watch);
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);

export default videoRouter;