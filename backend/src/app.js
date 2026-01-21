import express from "express";
import cors from "cors";
// import User from "./models/User"
import apiKeyAuth from "./middleware/apiKeyAuth.js";
import rateLimiter from "./middleware/rateLimiter.js";
import authRouter from "./routes/authRoutes.js"
import testRoutes from "./routes/testRoutes.js"
import adminRoutes from "./routes/adminRoutes.js";
import apiKeyRoutes from "./routes/apiKeyRoutes.js";
const app=express();


app.use(cors());
app.use(express.json());

app.use("/api/key",apiKeyRoutes);
app.use("/api/auth",authRouter);
app.use("/api",testRoutes);
app.use("/api/admin",adminRoutes);
app.get("/",(req,res)=>{
    res.send("API rate limiting is running in backend")
});



export default app;