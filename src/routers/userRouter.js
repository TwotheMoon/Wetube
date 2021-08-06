import express from "express";  // node_modules 에서 임포트 (패키지)
import {edit, remove, logout, see} from "../controllers/userController" // 내가 만든 폴더에서 함수 임포트

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.get("/edit", edit);
userRouter.get("/remove", remove);
userRouter.get(":id", see);

export default userRouter;