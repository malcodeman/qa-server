import express from "express";

import { create } from "./comments_controller";
import { requireAuthentication } from "../auth/auth_middleware.js";

const router = express.Router();

router.use(requireAuthentication);
router.post("/", create);

export default router;
