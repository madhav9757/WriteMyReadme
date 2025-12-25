import { ENV } from "./env.js";

export const JWT_CONFIG = {
  secret: ENV.JWT_SECRET,
  expiresIn: ENV.JWT_EXPIRES_IN, // e.g., "1h"
};
