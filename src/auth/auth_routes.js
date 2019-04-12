import express from "express";

import {
  signup,
  login,
  validateEmail,
  validateUsername
} from "./auth_controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/validate/email", validateEmail);
router.post("/validate/username", validateUsername);

export default router;
