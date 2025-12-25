import { verifyJwt } from "../services/auth/jwt.service.js"; // your JWT utils

export const authGuard = (req, res, next) => {
  const token = req.cookies?.auth_token; // read JWT from cookie

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const payload = verifyJwt(token); // verify JWT
    req.githubToken = payload.githubToken; // attach GitHub token for repo API
    req.user = payload.user; // attach user info
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
