import express from "express";
import { signup } from "../controllers/admin.controller";

const router = express.Router();

router.post('/', signup)

export default router;