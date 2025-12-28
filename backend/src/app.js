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
  "https://write-my-readme-qc99f.vercel.app", // Your Production Frontend
  "http://localhost:5173",                     // Your Local Vite Dev
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Required because your Axios uses withCredentials: true
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Cookie"
  ],
  optionsSuccessStatus: 200, // Legacy browsers/Vercel edge compatibility
};

// 1. Apply CORS to handle all normal requests
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

// 2. Explicitly handle Preflight OPTIONS requests globally at the top
// app.options("*", cors(corsOptions));
/* ------------------------- Security Middleware ------------------------- */
app.use(
  helmet({
    // Necessary so helmet doesn't block cross-origin resources
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