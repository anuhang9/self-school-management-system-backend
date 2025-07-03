import { Request, Response } from "express";
import { SchoolAdmin } from "../model/user.model";
import bcrytpt from 'bcryptjs';

export const signup =async(req: Request, res: Response)=>{

    const {name, email, password, userName} = req.body;

    try{
        if(!name || !email || !userName || !password){
            throw new Error("all fields are required.");
        }

        const existedEmail = await SchoolAdmin.findOne({email});
        const existedUserName = await SchoolAdmin.findOne({userName})

        if(existedEmail){
            res.status(400).json({success: false, message: "email already exist"});
            return;
        }

        if(existedUserName){
            res.status(400).json({success: false, message: "username already exist."});
            return;
        }

        const hashPassword = bcrytpt.hash(password, 10);
        const verificationToken = Math.floor(10000 + Math.random()*10000);

        const user = new SchoolAdmin({
            name, userName, email, password: hashPassword, verificationToken, verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000
        })
        await user.save()

    }catch(error: unknown){
        if(error instanceof Error){
            res.status(500).json({success: false, message: error.message})
        }
        else{
            res.status(500).json({success: false, message: "unknow error appear in signup page"})
        }
    }
}