import { ENV } from "./env.js";

/* -------------------------------------------------------------------------- */
/*                          GitHub OAuth URL Builder                           */
/* -------------------------------------------------------------------------- */

const BASE_URL = "https://github.com/login/oauth/authorize";
const SCOPE = ["read:user", "repo"].join(" ");

export const GITHUB_OAUTH_URL = `${BASE_URL}?client_id=${ENV.GITHUB_CLIENT_ID}&redirect_uri=${encodeURIComponent(
  ENV.GITHUB_CALLBACK_URL
)}&scope=${encodeURIComponent(SCOPE)}&allow_signup=true`;
