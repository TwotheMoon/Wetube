import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import videoRouter from "./routers/videoRouter";
import userRouter from "./routers/userRouter";

const PORT = 4000;  // 포트번호 4000사용 백엔드 관습
const app = express();
const logger = morgan("dev");
 
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({extended:true}));
app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);



const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);  //서버 리스닝중
