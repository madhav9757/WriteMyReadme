import { verifyJwt } from "../services/auth/jwt.service.js";

export const authGuard = (req, res, next) => {
  const token = req.cookies?.auth_token;

  if (!token) {
    // Add this log temporarily to debug
    console.warn("No auth_token found in cookies. Cookies received:", req.cookies);
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const payload = verifyJwt(token);
    req.user = payload;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};