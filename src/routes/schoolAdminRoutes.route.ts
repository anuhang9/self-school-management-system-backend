import express from "express";
import { checkAuth, emailVerify, login, logout, signup } from "../controllers/admin.controller";

const router = express.Router();

router.post('/check-auth', checkAuth);

router.post('/signup', signup);

router.post('/email-verify', emailVerify);

router.post('/login', login);

router.post('/logout', logout);

export default router;