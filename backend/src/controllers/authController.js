import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

export const register=async(req,res)=>{
    try{
        const{name,email,password,plan}=req.body;

        const existingUSer=await User.findOne({email});
        if(existingUSer){
            return res.status(400).json({message:"user already exists"});
        }

        //hash password
        const hashedPassword=await bcrypt.hash(password,10);

        //created api key
        const apiKey=uuidv4();

        const user=await User.create({
          name,
          email,
          password:hashedPassword,
          apiKey,
          plan: plan === "PRO" ? "PRO" : "FREE" 
        });

    res.status(201).json({message:"User registered successfully",apiKey,plan:user.plan});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

export const login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        const user=await User.findOne({email});
        if(!user){
          return res.status(400).json({message:"Invalid credentials"});
        }

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }

        const token=jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        );
        res.json({token});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};