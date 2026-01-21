import ApiUsage from "../models/ApiUsage.js";

const usageLogger=async (req,res,next)=>{
     console.log("usageLogger HIT!!");
    try{
       const doc= await ApiUsage.create({
            userId:req.user._id,
            apiKey:req.user.apiKey,
            endpoint:req.originalUrl,
            method:req.method,
            plan:req.user.plan
        });
        console.log("Logging usage", doc._id);
    }catch(err){
        console.error("Usage logging failed:",err.message);
    }
    next();
};

export default usageLogger;