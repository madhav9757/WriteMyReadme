import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import routes from "./routes/index.js";
import { ENV } from "./config/env.js";
import { logger } from "./utils/logger.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

/* ------------------------- Security Middleware ------------------------- */
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

/* ---------------------------- CORS Setup ------------------------------- */
const allowedOrigins = [
  "https://write-my-readme-qc99f.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
  })
);

// Use the regex-safe version for the options pre-flight
app.options("(.*)", cors());

/* ------------------------- Request Parsers ------------------------------ */
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* ---------------------------- Logging ---------------------------------- */
if (ENV.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.use(
    morgan("combined", {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );
}

/* ----------------------------- Routes ---------------------------------- */
app.use("/api", routes);

/* ----------------------------- Root / Favicon --------------------------- */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "README Generator Backend",
    uptime: process.uptime(),
  });
});

app.get("/favicon.ico", (req, res) => res.status(204));

/* ------------------------ 404 Handler ---------------------------------- */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* ------------------------ Error Handler -------------------------------- */
app.use(errorMiddleware);

export default app;