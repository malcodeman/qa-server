import express from "express";

import { requireAuthentication } from "../auth/auth_middleware.js";
import { findMe, findByUsername, findAll } from "./users_controller.js";

const router = express.Router();

router.get("/me", requireAuthentication, findMe);
router.get("/:username", findByUsername);
router.get("/", requireAuthentication, findAll);

export default router;
