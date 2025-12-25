import rateLimit from "express-rate-limit";
import { ENV } from "../config/env.js";

/* -------------------------------------------------------------------------- */
/*                               Base Config                                  */
/* -------------------------------------------------------------------------- */

const createLimiter = ({ windowMs, max, message }) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message,
    },
    skip: () => ENV.NODE_ENV === "test",
  });

/* -------------------------------------------------------------------------- */
/*                               Limiters                                     */
/* -------------------------------------------------------------------------- */

// OAuth & Auth endpoints
const auth = createLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: "Too many authentication attempts. Please try again later.",
});

// AI-heavy endpoints (README generation)
const ai = createLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: "Too many AI requests. Please slow down.",
});

// General API limiter
const api = createLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests. Please try again later.",
});

export default {
  auth,
  ai,
  api,
};
