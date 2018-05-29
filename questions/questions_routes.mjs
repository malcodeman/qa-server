import express from "express";

import {
  create,
  findAll,
  findById,
  updateById,
  createUpvote,
  createDownvote
} from "./questions_controller.mjs";

const router = express.Router();

// Questions
router.post("/", create);
router.get("/", findAll);
router.get("/:id", findById);
router.put("/:id", updateById);

// Votes
router.post("/:id/upvotes", createUpvote);
router.post("/:id/downvotes", createDownvote);

export default router;
