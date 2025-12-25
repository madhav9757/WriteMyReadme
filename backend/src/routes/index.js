import { Router } from "express";

import authRoutes from "./auth.routes.js";
import repoRoutes from "./repo.routes.js";
import readmeRoutes from "./readme.routes.js";

const router = Router();

/* ----------------------------- API Health ------------------------------ */
router.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

/* ------------------------------ API v1 --------------------------------- */
router.use("/auth", authRoutes);
router.use("/repos", repoRoutes);
router.use("/readme", readmeRoutes);

export default router;
