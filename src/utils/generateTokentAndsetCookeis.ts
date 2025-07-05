import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndCookie =(res: Response, userId: string)=>{
    const jwt_secret = process.env.JWT_SECRET_KEY;

    if(!jwt_secret){
        throw new Error("json secret key not avilable in env file");
    }
    const token = jwt.sign({userId}, jwt_secret, {expiresIn: "15m"});
    res.cookie("ssms", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000*60*15
    });
    return token;
}