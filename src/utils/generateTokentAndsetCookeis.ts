import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndCookie =(res: Response, userName: string)=>{
    const jwt_secret = process.env.JSON_SECRET_kEY;

    if(!jwt_secret){
        throw new Error("json secret key not avilable in env file");
    }
    const token = jwt.sign({userName}, jwt_secret, {expiresIn: "6h"});
    res.cookie("ssms", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000*60*60*6
    });
    return token;
}