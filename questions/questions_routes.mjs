import express from "express";

import { create, getAll, getById } from "./questions_controller.mjs";

const router = express.Router();

router.post("/", create);
router.get("/", getAll);
router.get("/:id", getById);

export default router;
