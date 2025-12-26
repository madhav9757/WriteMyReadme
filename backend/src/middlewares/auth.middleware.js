import { verifyJwt } from "../services/auth/jwt.service.js";

export const authGuard = (req, res, next) => {
  const token = req.cookies?.auth_token;

  // Always reflect origin for credentialed requests
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = verifyJwt(token);
    req.githubToken = payload.githubToken;
    req.user = payload.user;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
