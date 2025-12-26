import crypto from "crypto";
import { ENV } from "../config/env.js";
import { GITHUB_OAUTH_URL } from "../config/github.config.js";
import { tokenStore } from "../services/auth/token.store.js";
import { exchangeCodeForToken, fetchGitHubUser } from "../services/auth/github.service.js";
import { signJwt, verifyJwt } from "../services/auth/jwt.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/* ---------------- GitHub Login ---------------- */
export const githubLogin = asyncHandler(async (req, res) => {
  const state = crypto.randomBytes(16).toString("hex");

  res.cookie("oauth_state", state, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 10 * 60 * 1000,
  });

  res.redirect(`${GITHUB_OAUTH_URL}&state=${state}`);
});

/* ---------------- GitHub Callback ---------------- */
export const githubCallback = asyncHandler(async (req, res) => {
  const { code, state } = req.query;
  const savedState = req.cookies.oauth_state;

  if (!code || !state || state !== savedState) {
    return res.status(400).json({ message: "Invalid OAuth state" });
  }

  res.clearCookie("oauth_state");

  const githubToken = await exchangeCodeForToken(code);
  if (!githubToken) throw new Error("GitHub token missing");

  const githubUser = await fetchGitHubUser(githubToken);
  if (!githubUser?.id) throw new Error("Invalid GitHub user");

  const jwtToken = signJwt({
    id: githubUser.id,
    login: githubUser.login,
  });

  tokenStore.set(jwtToken, githubToken);

  res.cookie("auth_token", jwtToken, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
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
