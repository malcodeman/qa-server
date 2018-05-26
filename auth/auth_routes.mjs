import express from "express";
import { signup, login, logout } from "./auth_controller.mjs";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router;
