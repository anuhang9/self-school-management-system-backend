import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { url } from 'inspector';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.NODE_MAILER_EMAIL,
        pass: process.env.NODE_MAILER_PASSWORD
    }
})
interface EmailOption{
    to: string,
    subject: string,
    html: string,
}
export const sendMail = async({to, subject, html}: EmailOption)=>{
    const info = await transporter.sendMail({
        from: "school management system",
        to,
        subject,
        html
    })
    nodemailer.getTestMessageUrl(info)
    console.log(nodemailer.getTestMessageUrl(info))
}