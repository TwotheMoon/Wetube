import express from "express";

const PORT = 4000;
// 서버 구축 선언
const app = express();


// 서버 내부 로직
const handleHome = (req, res) => {
    return res.send("<h1>sdf</h1>");
}
const handleLogin = (req, res) => {
    return res.send("login");
}
app.get("/", handleHome);
app.get("/login", handleLogin);


// 서버 실행하기 (리스닝 실행 )
const handleListening = () => console.log(`Server Listen on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);