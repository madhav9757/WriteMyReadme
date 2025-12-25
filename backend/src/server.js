import http from "node:http";
import app from "./app.js";
import { ENV } from "./config/env.js";
import { logger } from "./utils/logger.js";

const server = http.createServer(app);

// Graceful startup
server.listen(ENV.PORT, () => {
  logger.info(`🚀 Server running on port ${ENV.PORT} (${ENV.NODE_ENV})`);
});

// Graceful shutdown (important for production)
const shutdown = (signal) => {
  logger.warn(`⚠️ Received ${signal}. Shutting down gracefully...`);

  server.close(() => {
    logger.info("🛑 Server closed");
    process.exit(0);
  });

  // Force exit if not closed in time
  setTimeout(() => {
    logger.error("❌ Forcefully shutting down");
    process.exit(1);
  }, 10000);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
