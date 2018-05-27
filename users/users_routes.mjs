import express from "express";

import { get, getAll } from "./users_controller.mjs";
import { requireAuthentication } from "../auth/auth_middleware.mjs";

const router = express.Router();

router.use(requireAuthentication);
router.get("/me", get);
router.get("/", getAll);

export default router;
