import express from "express";
import apiKeyAuth from "../middleware/apiKeyAuth.js";
import rateLimiter from "../middleware/endPointRateLimiter.js";
import usageLogger from "../middleware/usageLogger.js";
import endPointRateLimiter from "../middleware/rateLimiter.js";
import redisCache from "../middleware/redisCache.js";
const router=express.Router();

router.get("/ping",(req,res)=>{
    res.json({message:"Backend is live"});
})

router.get("/test",
    apiKeyAuth,
    rateLimiter,
    endPointRateLimiter,
    redisCache(60),
    usageLogger,(req,res)=>{
   try {
        res.json({
            message: "Request successful",
            plan: req.user.plan,
        });
    } catch (err) {
        next(err);
    }
});
export default router;