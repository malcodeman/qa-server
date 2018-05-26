import express from "express";

import { get } from "./users_controller.mjs";
import { requireAuthentication } from "../auth/auth_middleware.mjs";

const router = express.Router();

router.use(requireAuthentication);
router.get("/me", get);

export default router;
