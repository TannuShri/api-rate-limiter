import mongoose from "mongoose";

const apiUsageSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    apiKey:{
        type:String,
        required:true,
    },
    endpoint:{
        type:String,
        required:true,
    },
    method:{
        type:String,
        required:true,
    },
    plan:{
        type:String,
        enum:["FREE","PRO"],
        required:true,
    },
    timestamp:{
        type:Date,
        default:Date.now,
    }
});

export default mongoose.model("ApiUsage",apiUsageSchema);