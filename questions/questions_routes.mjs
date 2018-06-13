import express from "express";

import {
  create,
  findAll,
  findById,
  createUpvoteQuestion,
  createDownvoteQuestion
} from "./questions_controller.mjs";

import {
  createDownvoteAnswer,
  createUpvoteAnswer
} from "../answers/answers_controller.mjs";

import { requireAuthentication } from "../auth/auth_middleware.mjs";

const router = express.Router();

router.use(requireAuthentication);

// Questions
router.post("/", create);
router.get("/", findAll);
router.get("/:id", findById);

// Question votes
router.post("/:id/upvotes", createUpvoteQuestion);
router.post("/:id/downvotes", createDownvoteQuestion);

// Answer votes
router.post("/:id/answers/:id/upvotes", createUpvoteAnswer);
router.post("/:id/answers/:id/downvotes", createDownvoteAnswer);

export default router;
