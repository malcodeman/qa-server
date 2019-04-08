import express from "express";

import { requireAuthentication } from "../auth/auth_middleware.js";
import { create, findAll, findById } from "./questions_controller.js";
import { createQuestionComment } from "../comments/comments_controller";
import { upvoteQuestion } from "../upvotes/upvotes_controller";

const router = express.Router();

router.use(requireAuthentication);
router.post("/", create);
router.get("/", findAll);
router.get("/:id", findById);
router.post("/:id/comments", createQuestionComment);
router.post("/:id/upvotes", upvoteQuestion);

export default router;
