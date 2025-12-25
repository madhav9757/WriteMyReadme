import { Router } from "express";
import {
  githubLogin,
  githubCallback,
  logout,
  getCurrentUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.get("/github", githubLogin);
router.get("/github/callback", githubCallback);
router.post("/logout", logout);
router.get("/me", getCurrentUser);

export default router;
