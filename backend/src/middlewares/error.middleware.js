import { ENV } from "../config/env.js";
import { logger } from "../utils/logger.js";

export default function errorMiddleware(err, req, res, next) {
  const statusCode = err.statusCode || err.status || 500;

  // Log full error (always)
  logger.error(
    {
      method: req.method,
      url: req.originalUrl,
      statusCode,
      stack: err.stack,
    },
    err.message
  );

  // Response payload
  const response = {
    success: false,
    message:
      statusCode === 500
        ? "Internal Server Error"
        : err.message || "Something went wrong",
  };

  // Expose stack only in development
  if (ENV.NODE_ENV !== "production") {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
}
