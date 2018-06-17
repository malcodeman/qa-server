import express from "express";

import { create, destroy } from "./upvotes_controller.mjs";
import { requireAuthentication } from "../auth/auth_middleware.mjs";

const router = express.Router();

router.use(requireAuthentication);
router.post("/", create);
router.delete("/:id", destroy);

export default router;
