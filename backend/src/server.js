import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";
import connectDB from "./config/db.js";
import "./config/redis.js"; // just import once



connectDB();

const PORT=process.env.PORT||5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})