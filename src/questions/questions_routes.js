import express from "express";

import { create, findAll, findById } from "./questions_controller.js";
import { createUpvoteAnswer } from "../answers/answers_controller.js";
import { requireAuthentication } from "../auth/auth_middleware.js";

const router = express.Router();

router.use(requireAuthentication);

// Questions
router.post("/", create);
router.get("/", findAll);
router.get("/:id", findById);

// Answer votes
router.post("/:id/answers/:id/upvotes", createUpvoteAnswer);

export default router;
