import User from "../models/User.js";

const apiKeyAuth=async(req,res,next)=>{
    try{
        const apiKey=req.header("x-api-key");

        if(!apiKey){
            return res.status(401).json({messsage:"API key missing"});
        }

        const user=await User.findOne({apiKey});
        if(!user){
            return res.status(401).json({Message:"Invalid API key"});
        }

        req.user=user;
        next();
    }catch(err){
        res.status(500).json({error:err.message});
        }
    };

 export default apiKeyAuth;   