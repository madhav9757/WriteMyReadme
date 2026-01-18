import dotenv from "dotenv";

dotenv.config();

/* -------------------------------------------------------------------------- */
/*                              ENV VALIDATION                                */
/* -------------------------------------------------------------------------- */

const required = (key) => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`❌ Missing required environment variable: ${key}`);
  }
  return value;
};

export const ENV = {
  /* App */
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT || 5000),

  /* Client */
  // VERCEL_URL is a system variable provided by Vercel automatically
  CLIENT_URL: process.env.CLIENT_URL || `https://${process.env.VERCEL_URL}`,
  CORS_ORIGIN: process.env.CORS_ORIGIN || process.env.CLIENT_URL || "*",

  /* Auth */
  JWT_SECRET: process.env.NODE_ENV === "production" ? required("JWT_SECRET") : (process.env.JWT_SECRET || "dev-secret"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",

  /* GitHub OAuth */
  GITHUB_CLIENT_ID: required("GITHUB_CLIENT_ID"),
  GITHUB_CLIENT_SECRET: required("GITHUB_CLIENT_SECRET"),
  GITHUB_CALLBACK_URL: required("GITHUB_CALLBACK_URL"),
  GITHUB_PAT: required("GITHUB_ACCESS_TOKEN"),

  /* AI */
  OPENROUTER_API_KEY: required("OPENROUTER_API_KEY").trim(),
};