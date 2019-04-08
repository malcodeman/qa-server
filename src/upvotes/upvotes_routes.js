import express from "express";

import { requireAuthentication } from "../auth/auth_middleware.js";
import { destroy } from "./upvotes_controller.js";

const router = express.Router();

router.use(requireAuthentication);
router.delete("/:id", destroy);

export default router;
