import express from "express";
const router = express.Router();

import { createAccount, login } from "../controllers/user.controller.js";

router.post("/register", createAccount);
router.post("/login", login);

export default router;
