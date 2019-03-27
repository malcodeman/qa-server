import express from "express";

import {
  findByUsername,
  findAll,
  findMe,
  updateTheme
} from "./users_controller.js";
import { requireAuthentication } from "../auth/auth_middleware.js";

const router = express.Router();

router.use(requireAuthentication);

router.get("/me", findMe);
router.get("/:username", findByUsername);
router.get("/", findAll);
router.put("/theme", updateTheme);

export default router;
