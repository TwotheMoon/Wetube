import express from "express"; // node_modules 에서 임포트 (패키지)
import {see, edit, upload, deleteVideo} from "../controllers/videoController";// 내가 만든 폴더에서 함수 임포트

const videoRouter = express.Router();

videoRouter.get("/upload", upload);
videoRouter.get("/:id", see);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/delete", deleteVideo);

export default videoRouter;