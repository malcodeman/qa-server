import express from "express";

import { findById, findAll } from "./users_controller.mjs";
import { requireAuthentication } from "../auth/auth_middleware.mjs";

const router = express.Router();

router.use(requireAuthentication);
router.get("/:id", findById);
router.get("/", findAll);

export default router;
