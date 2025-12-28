import { verifyJwt } from "../services/auth/jwt.service.js";

export const authGuard = (req, res, next) => {
  const token = req.cookies?.auth_token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
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
