import express from "express";
import morgan from "morgan";

const PORT = 4000;  // 포트번호 4000사용 백엔드 관습

const app = express();
const logger = morgan("dev");

const home = (req, res) => {
  return res.end("hello");  
};
const login = (req, res) => {
  return res.send("login");
}

app.use(logger);
app.get("/", home);
app.get("/login", login);


const handleListening = () => 
    console.log(`Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);  //서버 리스닝중
