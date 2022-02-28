import express from "express";
import morgan from "morgan";
import globalRouter from "../routers/globalRouter";
import userRouter from "../routers/userRouter";
import videoRouter from "../routers/videoRouter";

const PORT = 4000;
// 서버 구축 선언
const app = express();
const logger = morgan("dev");
app.use(logger);

// globalRouter
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

// 서버 실행하기 (리스닝 실행 )
const handleListening = () => console.log(`Server Listen on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);