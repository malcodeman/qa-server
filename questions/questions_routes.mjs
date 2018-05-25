import express from "express";

import { create, get } from "./questions_controller.mjs";

const router = express.Router();

router.post("/", create);
router.get("/", get);

export default router;
