import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../../config/jwt.config.js";

export const signJwt = (payload) =>
  jwt.sign(payload, JWT_CONFIG.secret, {
    expiresIn: JWT_CONFIG.expiresIn,
  });

export const verifyJwt = (token) =>
  jwt.verify(token, JWT_CONFIG.secret);
