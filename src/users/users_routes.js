import express from "express";

import { requireAuthentication } from "../auth/auth_middleware.js";
import { findMe, findByUsername, findAll } from "./users_controller.js";

const router = express.Router();

router.use(requireAuthentication);
router.get("/me", findMe);
router.get("/:username", findByUsername);
router.get("/", findAll);

export default router;
