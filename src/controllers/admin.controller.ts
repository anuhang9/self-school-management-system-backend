import { Request, Response } from "express";
import { SchoolAdmin } from "../model/auth.model";
import bcrypt from 'bcryptjs';
import { generateTokenAndCookie } from "../utils/generateTokentAndsetCookeis";
import { sendMail } from "../lib/nodemailer.config";
import { VERIFICATION_EMAIL_TEMPLATE } from "../lib/verificationTemplete";
import { PASSWORD_RECOVER_EMPLATE } from "../lib/passwordRecover";
import { randomBytes } from "crypto";
import { env } from "process";

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

        const hashPassword = await bcrypt.hash(password, 10);
        const verificationToken = Math.floor(10000 + Math.random()*10000);

        const user = new SchoolAdmin({
            name, userName, email, password: hashPassword, verificationToken, verificationTokenExpiresAt: Date.now() + 15 * 60 * 1000,
        })
        await user.save();
        // json web token
       generateTokenAndCookie(res, user._id.toString());
        // send mail is a promise so i need to use 'await sendMail().cattch' but i dont use because error hendle by tryp catch
        await sendMail({
            from: "school management system",
            to: email,
            subject: "otp verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace(
          "{verificationCode}",
          `${verificationToken}`)
        })
        res.status(201).json({
            success: true,
            message: "otp verification sent.",
            redirect: "/email-verify"
        })

    }catch(error: unknown){
        if(error instanceof Error){
            res.status(500).json({success: false, message: error.message});
        }
        else{
            res.status(500).json({success: false, message: "unknow error appear in signup page"});
        }
    }
}

export const emailVerify =async(req: Request, res: Response)=>{
    const {otpCode} = req.body;
    try{
        const user = await SchoolAdmin.findOne({
            verificationToken: otpCode,
            verificationTokenExpiresAt: {$gt: Date.now()}
        })
        if(!user){
            res.status(400).send({success: false, message: "invalid token or expired."});
            return;
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        res.status(200).json({success: true, message: "email verification is successfull."});
        await user.save()
    }catch(error: unknown){
        if(error instanceof Error){
            res.status(500).json({success: false, message: error.message});
        }
        else{
            res.status(500).json({success: false, message: "error appear in email verify page."});
        }
    }

}

export const login = async (req: Request, res: Response)=>{
    const {userName, password} = req.body;
    try{
        const user = await SchoolAdmin.findOne({userName});

        if(!user){
            res.status(400).json({success: false, message: "incorrect credentials."});
            return;
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if(!isValidPassword){
            res.status(400).json({success: false, message: "incorrect credentials."});
            return;
        }

        generateTokenAndCookie(res, user._id.toString());
        user.lastLogin = new Date();
        await user.save()

        res.status(200).json({success: true, message: "login successfull."})

    }catch(error){
        if(error instanceof Error){
            res.status(500).json({success: false, message: error.message });
        }
        else{
        res.status(500).json({success: false, message: "error occurred in login page."});
        }
    }
}

export const logout = async(req: Request, res: Response)=>{
    res.clearCookie("ssms");
    res.status(200).json({success: true, message: "logout successfull."})
}

export const forgetPassword = async(req: Request, res: Response)=>{
    const {email} = req.body;
    try{
        const user = await SchoolAdmin.findOne({email});
        if(!user){
            res.status(400).json({success: false, message: "pleas enter valid email."})
            return;
        }
        const resetToken = randomBytes(20).toString("hex");
        const resetPasswordExpiresAt = new Date(Date.now()+ 1000*15)

        user.resetPasswordToken = resetToken;
        user.resetPasswordTokenExpiresAt = resetPasswordExpiresAt;

        await user.save()

        const urlResetPassword = `http://${process.env.URL_LOCAL_HOST}/reset-passowrd=${resetToken}&user-name${user.userName}`

        res.status(200).json({success: true, message: "please check your email.", redirect: '/reset-password'})

        await sendMail({
            from: "school management system", 
            to: user.email,
            subject: "recover password",
            html: PASSWORD_RECOVER_EMPLATE.replace("{resetUrl}", urlResetPassword)
        })

    }catch(error){
        if(error instanceof Error){
            res.status(500).json({success: false, message: error.message})
        }
        else{
            res.status(500).json({success: false, message: "some error occurred in forget passowrd."})
        }
    }
}

export const resetPassword = async(req: Request, res: Response)=>{
    const {password} = req.body;
    const {token} = req.params;
    try{
        const user = await SchoolAdmin.findOne({
            resetPasswordToken: token,
            resetPasswordTokenExpiresAt: {gt: Date.now()}
        })

        if(!user){
            res.status(400).json({success: false, message: "enter valid token."})
            return;
        }

        const hashPassword = await bcrypt.hash(password, 10);

        user.password = hashPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpiresAt = undefined;
        await user.save();

    }catch(error){
        if(error instanceof Error){
            res.status(500).json({success: false, message: error.message})
        }
        else{
            res.status(500).json({success: false, message: "error appeared in reset password page please contact software provider. thank you."})
        }
    }
}

export const checkAuth = async(req: Request, res: Response)=>{
    try{
        // res.status(200).json({success: true, message: "you are authenticated."})
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({success: false, message: error.message});
        }
        else{
            res.status(500).json({success: false, message: "some error occurred in authentication."});
        }
    }
}