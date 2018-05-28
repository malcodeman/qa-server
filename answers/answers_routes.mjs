import express from "express";

import { create, findAll } from "./answers_controller.mjs";

const router = express.Router();

router.post("/", create);
router.get("/", findAll);

export default router;
