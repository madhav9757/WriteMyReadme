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
import { logger } from "../utils/logger.js";

/* ---------------- GitHub Login ---------------- */
export const githubLogin = asyncHandler(async (req, res) => {
  const state = crypto.randomBytes(16).toString("hex");

  res.cookie("oauth_state", state, {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 10 * 60 * 1000,
    path: "/",
  });

  res.redirect(`${GITHUB_OAUTH_URL}&state=${state}`);
});

/* ---------------- GitHub Callback ---------------- */
export const githubCallback = asyncHandler(async (req, res) => {
  const { code, state } = req.query;
  const savedState = req.cookies.oauth_state;

  if (!code || !state || state !== savedState) {
    logger.error(`State mismatch. Received: ${state}, Saved: ${savedState}`);
    return res.status(400).json({ message: "Invalid OAuth state" });
  }

  res.clearCookie("oauth_state", {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
  });

  try {
    const githubToken = await exchangeCodeForToken(code);
    const githubUser = await fetchGitHubUser(githubToken);

    const jwtToken = signJwt({
      id: githubUser.id,
      login: githubUser.login,
    });

    // Store the mapping: JWT -> GitHub Token
    tokenStore.set(jwtToken, githubToken);

    res.cookie("auth_token", jwtToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/",
    });

    logger.info(`User ${githubUser.login} authenticated successfully`);
    res.redirect(`${ENV.CLIENT_URL}/dashboard`);
  } catch (error) {
    logger.error("GitHub OAuth error:", error);
    res.redirect(`${ENV.CLIENT_URL}?error=auth_failed`);
  }
});

/* ---------------- Logout ---------------- */
export const logout = asyncHandler(async (req, res) => {
  const token = req.cookies?.auth_token;
  if (token) {
    tokenStore.delete(token);
  }

  res.clearCookie("auth_token", {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: ENV.NODE_ENV === "production" ? "none" : "lax",
    path: "/",
  });

  res.json({ success: true, message: "Logged out successfully" });
});

/* ---------------- Current User ---------------- */
export const getCurrentUser = asyncHandler(async (req, res) => {
  const token = req.cookies?.auth_token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No authentication token found",
    });
  }

  try {
    const decoded = verifyJwt(token);
    
    // Verify the token is still in our store
    if (!tokenStore.has(token)) {
      return res.status(401).json({
        success: false,
        message: "Session expired",
      });
    }

    return res.json({
      success: true,
      user: {
        id: decoded.id,
        login: decoded.login,
      },
    });
  } catch (error) {
    logger.error("JWT verification error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
});