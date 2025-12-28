import crypto from "crypto";
import { ENV } from "../config/env.js";
import { GITHUB_OAUTH_URL } from "../config/github.config.js";
import { tokenStore } from "../services/auth/token.store.js";
import {
  exchangeCodeForToken,
  fetchGitHubUser,
} from "../services/auth/github.service.js";
import { signJwt, verifyJwt } from "../services/auth/jwt.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/* ---------------- GitHub Login ---------------- */
export const githubLogin = asyncHandler(async (req, res) => {
  const state = crypto.randomBytes(16).toString("hex");

  res.cookie("oauth_state", state, {
    httpOnly: true,
    secure: true,      // ✅ Must be true for sameSite: "none"
    sameSite: "none",  // ✅ Required because frontend & backend origins differ
    maxAge: 10 * 60 * 1000,
    path: "/",         // Explicitly set path to ensure it's available for callback
  });

  res.redirect(`${GITHUB_OAUTH_URL}&state=${state}`);
});

/* ---------------- GitHub Callback ---------------- */
export const githubCallback = asyncHandler(async (req, res) => {
  const { code, state } = req.query;
  const savedState = req.cookies.oauth_state;

  // If this triggers, it means the browser didn't send the oauth_state cookie back
  if (!code || !state || state !== savedState) {
    logger.error(`State mismatch. Received: ${state}, Saved: ${savedState}`);
    return res.status(400).json({ message: "Invalid OAuth state" });
  }

  res.clearCookie("oauth_state", { httpOnly: true, secure: true, sameSite: "none" });

  const githubToken = await exchangeCodeForToken(code);
  const githubUser = await fetchGitHubUser(githubToken);

  const jwtToken = signJwt({
    id: githubUser.id,
    login: githubUser.login,
  });

  tokenStore.set(jwtToken, githubToken);

  res.cookie("auth_token", jwtToken, {
    httpOnly: true,
    secure: true, 
    sameSite: "none", 
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.redirect(`${ENV.CLIENT_URL}/dashboard`);
});
/* ---------------- Logout ---------------- */
export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies?.auth_token;
  if (token) tokenStore.delete(token);

  res.clearCookie("auth_token");
  res.json({ success: true });
});

/* ---------------- Current User ---------------- */
export const getCurrentUser = asyncHandler(async (req, res) => {
  const token = req.cookies?.auth_token;
  if (!token) {
    return res.status(401).json({ success: false });
  }

  const decoded = verifyJwt(token);
  res.json({ success: true, user: decoded });
});
