import "./db";
import "./models/Video";
import "./models/User";
import app from "./server.js";

// 서버 구축 선언
const PORT = 4000;
// 서버 실행하기 (리스닝 실행 )
const handleListening = () => console.log(`Server Listen on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);