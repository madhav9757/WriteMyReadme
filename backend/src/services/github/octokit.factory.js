import { Octokit } from "@octokit/rest";

/* ---------------------- Octokit Factory ---------------------- */
export const octokitFactory = (token) => {
  if (!token) throw new Error("GitHub token is required for Octokit");
  return new Octokit({
    auth: token,
    userAgent: "RepoSensei v1.0",
    timeZone: "UTC",
  });
};
