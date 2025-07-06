import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

// interface AuthenticatedRequest extends Request {
//     userName: string;
// }

export const verifyToken=async(req: Request, res: Response, next: NextFunction)=>{
    const token = req.cookies.ssms;
    if(!token){
        res.status(401).json({success: false, message: "unauthorized."})
        return
    }
    try{
        const jwt_secret = process.env.JWT_SECRET_KYE;
        if(!jwt_secret){
            res.status(404).json({success: false, message: "jwt not avilable in env file."})
            return;
        }
        jwt.verify(token, jwt_secret)
        next()
    }catch(error){
        if(error instanceof Error){
            res.status(500).json({success: false, message: error.message})
        }
        else{
            res.status(500).json({success: false, message: "some problem are appeared middleware"})
        }
    }
}