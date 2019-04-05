import express from "express";

import { create, findAll } from "./answers_controller.js";
import { requireAuthentication } from "../auth/auth_middleware.js";
import { createAnswerComment } from "../comments/comments_controller";

const router = express.Router();

router.use(requireAuthentication);
router.post("/", create);
router.get("/", findAll);
router.post("/:id/comments", createAnswerComment);

export default router;
