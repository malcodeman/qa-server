import express from "express";

import { create, findAll } from "./answers_controller.js";
import { requireAuthentication } from "../auth/auth_middleware.js";

const router = express.Router();

router.use(requireAuthentication);

router.post("/", create);
router.get("/", findAll);

export default router;
