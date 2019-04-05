import express from "express";

import { requireAuthentication } from "../auth/auth_middleware.js";
import { create, findAll, findById } from "./questions_controller.js";
import { createUpvoteAnswer } from "../answers/answers_controller.js";
import { createQuestionComment } from "../comments/comments_controller";

const router = express.Router();

router.use(requireAuthentication);
router.post("/", create);
router.get("/", findAll);
router.get("/:id", findById);
router.post("/:id/answers/:id/upvotes", createUpvoteAnswer);
router.post("/:id/comments", createQuestionComment);

export default router;
