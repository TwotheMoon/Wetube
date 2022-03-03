import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    //useFindAndModify: false
});  // wetube DB연결 및 설정 6버전 에서는 기본값

const db = mongoose.connection;

const handleOpen = () => console.log("Connected to DB ✅");
const handleError = (error) => console.log("❌DB Error", error);

db.on("error", handleError)
db.once("open", handleOpen);
