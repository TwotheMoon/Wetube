import express from "express";

const PORT = 4000;
// 서버 구축 선언
const app = express();

// 서버 내부 로직
const methodLogger = (req, res, next) => {
    console.log(`Method ${req.method}`);
    next();
};
const routerLogger = (req, res, next) => {
    console.log(`Path ${req.url}`);
    next();
}
const home = (req, res) => {
    return res.send("Home");
};

app.use(methodLogger);
app.use(routerLogger);
app.get("/", home);

// 서버 실행하기 (리스닝 실행 )
const handleListening = () => console.log(`Server Listen on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);