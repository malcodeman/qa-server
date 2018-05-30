import express from "express";

import { create, findAll } from "./answers_controller.mjs";

import { requireAuthentication } from "../auth/auth_middleware.mjs";

const router = express.Router();

router.use(requireAuthentication);

router.post("/", create);
router.get("/", findAll);

export default router;
