import express from "express"; // node_modules 에서 임포트 (패키지)
import {see, edit, upload, deleteVideo} from "../controllers/videoController";// 내가 만든 폴더에서 함수 임포트

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", see);
videoRouter.get("/:id(\\d+)/edit", edit);
videoRouter.get("/:id(\\d+)/delete", deleteVideo);
videoRouter.get("/upload", upload);

export default videoRouter;