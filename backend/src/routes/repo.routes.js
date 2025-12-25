import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";
import { authGuard } from "../middlewares/auth.middleware.js";
import { getUserRepos, getRepoTree } from "../controllers/repo.controller.js";
import rateLimit from "../middlewares/rateLimit.middleware.js";

const router = Router();

// Get all repos of logged-in user
router.get("/", authGuard, asyncHandler(getUserRepos));

// Get repo tree by owner + repo name
router.get("/:owner/:repo/tree", authGuard, rateLimit.api, asyncHandler(getRepoTree));

export default router;
