import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { EmailOption } from '../interfaces/nodemailerConfig';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASSWORD
    }
})

export const sendMail = async({to, from, subject, html}: EmailOption)=>{
    const info = await transporter.sendMail({
        from,
        to,
        subject,
        html
    })
    nodemailer.getTestMessageUrl(info)
    console.log(nodemailer.getTestMessageUrl(info))
}