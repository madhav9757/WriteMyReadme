import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authGuard } from "../middlewares/auth.middleware.js";
import { generateReadme, beautifyReadme } from "../controllers/readme.controller.js";
import rateLimit from "../middlewares/rateLimit.middleware.js";

const router = Router();

// Generate README for a repo
router.post(
  "/generate",
  authGuard,
  rateLimit.ai,
  asyncHandler(generateReadme)
);

router.post("/beautify", beautifyReadme);
export default router;
