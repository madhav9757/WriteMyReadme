import http from "node:http";
import app from "./app.js";
import { ENV } from "./config/env.js";
import { logger } from "./utils/logger.js";

// Vercel needs the exported app to handle the serverless execution
export default app;

// ONLY run the server.listen logic if we are NOT on Vercel
// Vercel sets the environment variable VERCEL=1 automatically
if (!process.env.VERCEL) {
  const server = http.createServer(app);
  const PORT = ENV.PORT || 8080;

  server.listen(PORT, () => {
    logger.info(`🚀 Local Server running on port ${PORT} (${ENV.NODE_ENV})`);
  });

  // Graceful shutdown logic remains for local/Docker use
  const shutdown = (signal) => {
    logger.warn(`⚠️ Received ${signal}. Shutting down gracefully...`);
    server.close(() => {
      logger.info("🛑 Server closed");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}