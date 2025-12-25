import axios from "axios";
import { ENV } from "../../config/env.js";

export const exchangeCodeForToken = async (code) => {
  const res = await axios.post(
    "https://github.com/login/oauth/access_token",
    {
      client_id: ENV.GITHUB_CLIENT_ID,
      client_secret: ENV.GITHUB_CLIENT_SECRET,
      code,
    },
    {
      headers: {
        Accept: "application/json",
        "User-Agent": "WriteMyReadme-App",
      },
      timeout: 10000,
    }
  );

  return res.data.access_token;
};

export const fetchGitHubUser = async (githubToken) => {
  const res = await axios.get("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${githubToken}`,
      "User-Agent": "WriteMyReadme-App",
    },
  });

  return res.data;
};
