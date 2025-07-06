import express from "express";
import { checkAuth, emailVerify, forgetPassword, login, logout, resetPassword, signup } from "../controllers/admin.controller";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.post('/check-auth',verifyToken, checkAuth);

router.post('/signup', signup);

router.post('/email-verify', emailVerify);

router.post('/login', login);

router.post('/logout', logout);

router.post('/forget-password', forgetPassword);

router.post('/reset-password', resetPassword);

export default router;