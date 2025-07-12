import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'


interface AuthRequest extends Request{
    userId?: string;
}
export const verifyToken= (req: AuthRequest, res: Response, next: NextFunction)=>{
    const token = req.cookies.ssms;
    if(!token){
        res.status(401).json({success: false, message: "unauthorized."})
        return;
    }
    try{
        const jwt_secret = process.env.JWT_SECRET_KEY;
        if(!jwt_secret){
            res.status(500).json({success: false, message: "jwt not avilable in env file."})
            return;
        }
        const decode = jwt.verify(token, jwt_secret) as {userId: string};
        // if(!decode){
        //     res.status(401).json({success: false, message: "invalid token."})
        // }
        req.userId = decode.userId
        next()
    }catch(error){
        if(error instanceof Error){
            res.status(401).json({success: false, message: error.message})
        }
        else{
            res.status(500).json({success: false, message: "some problem are appeared middleware"})
        }
    }
}