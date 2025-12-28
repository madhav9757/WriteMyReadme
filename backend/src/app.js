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

/* ---------------------------- CORS Setup ------------------------------- */
const allowedOrigins = [
  "https://write-my-readme-qc99f.vercel.app", 
  "https://write-my-readme-madhavs-projects-45ed597c.vercel.app", // Added your specific deployment URL
  "http://localhost:5173",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".vercel.app")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Cookie"],
  optionsSuccessStatus: 200,
};

// 1. MUST BE FIRST: Apply CORS to all requests
app.use(cors(corsOptions));

// 2. EXPRESS 5 FIX: Wildcards must be named. Use {*path} or /*path
app.options("{*path}", cors(corsOptions));

/* ------------------------- Security Middleware ------------------------- */
app.use(
  helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
  })
);

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
      stream: { write: (message) => logger.info(message.trim()) },
    })
  );
}

/* ----------------------------- Routes ---------------------------------- */
app.use("/api", routes);

/* ----------------------------- Root ------------------------------------ */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    service: "README Generator Backend",
    uptime: process.uptime(),
  });
});

app.get("/favicon.ico", (req, res) => res.status(204));

/* ------------------------ 404 Handler ---------------------------------- */
// EXPRESS 5 FIX: Use app.use without a path to catch everything remaining
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`,
  });
});

/* ------------------------ Error Handler -------------------------------- */
app.use(errorMiddleware);

export default app;