import User from "../models/user.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config'
import Token from "../models/token.js"

export const signup=async (req,res)=>{
    try{
        const body=req.body;
        
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(req.body.password,salt);

        const hashedBody={...body,password:hashPassword};
        const user=new User(hashedBody);
        await user.save();
        console.log("User registered successfully");

        return res.status(200).json({message:"User registered successfully"});
    }
    catch(error){
        console.log("Error in signing up");
        return res.status(500).json({message:"Error in signing up. Please try again later."});
    }
}

export const login=async (req,res)=>{
    let user=await User.findOne({username:req.body.username});
    if(!user){
        return res.status(400).json({message:"User does not exist"});
    }

    try{
        let match=await bcrypt.compare(req.body.password,user.password);
        if(match){
            const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:"15m"});
            const refreshToken=jwt.sign(user.toJSON(),process.env.REFRESH_SECRET_KEY);

            const token=new Token({token:refreshToken});
            await token.save();

            return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,username:user.username});
        }
        else{
            res.status(400).json({message:"Password is incorrect"});
        }
    }
    catch(error){
        return res.status(500).json({message:"Error while logging in the user"});
    }
}
