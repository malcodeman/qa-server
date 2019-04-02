import express from "express";

import {
  findByUsername,
  findAll,
  findMe,
  updateTheme
} from "./users_controller.js";
import { requireAuthentication } from "../auth/auth_middleware.js";

const router = express.Router();

router.get("/me", requireAuthentication, findMe);
router.get("/:username", findByUsername);
router.get("/", requireAuthentication, findAll);
router.put("/theme", requireAuthentication, updateTheme);

export default router;
