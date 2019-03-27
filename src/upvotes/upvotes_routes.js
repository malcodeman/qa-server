import express from "express";

import { create, destroy } from "./upvotes_controller.js";
import { requireAuthentication } from "../auth/auth_middleware.js";

const router = express.Router();

router.use(requireAuthentication);
router.post("/", create);
router.delete("/:id", destroy);

export default router;
