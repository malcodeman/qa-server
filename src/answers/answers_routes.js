import express from "express";

import { requireAuthentication } from "../auth/auth_middleware.js";
import { create } from "./answers_controller.js";
import { createAnswerComment } from "../comments/comments_controller";
import { upvoteAnswer, downvoteAnswer } from "../upvotes/upvotes_controller";

const router = express.Router();

router.use(requireAuthentication);
router.post("/", create);
router.post("/:id/comments", createAnswerComment);
router.post("/:id/upvotes", upvoteAnswer);
router.delete("/:id/upvotes", downvoteAnswer);

export default router;
