import pino from "pino";
import { ENV } from "../config/env.js";

const isDev = ENV.NODE_ENV !== "production";

export const logger = pino({
  level: isDev ? "debug" : "info",
  transport: isDev
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "yyyy-mm-dd HH:MM:ss",
          ignore: "pid,hostname",
        },
      }
    : undefined,
  base: {
    service: "readme-generator-backend",
  },
  // Automatically include request IDs or custom fields later if needed
});
