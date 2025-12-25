import { octokitFactory } from "../services/github/octokit.factory.js";
import { getRepoTreeService } from "../services/github/repo.service.js";
import { ENV } from "../config/env.js";

/* --------------------- Get Logged-in User Repos ------------------------- */
export const getUserRepos = async (req, res) => {
  const githubToken = ENV.GITHUB_PAT; 
  const octokit = octokitFactory(githubToken);

  const repos = await octokit.rest.repos.listForAuthenticatedUser({
    visibility: "all",
    per_page: 100,
  });

  res.json({
    success: true,
    repos: repos.data.map((r) => ({
      id: r.id,
      name: r.name,
      full_name: r.full_name,
      private: r.private,
      html_url: r.html_url,
      description: r.description,
    })),
  });
};

/* --------------------------- Get Repo Tree -------------------------------- */
export const getRepoTree = async (req, res) => {
  const { owner, repo } = req.params;

  const octokit = octokitFactory(req.githubToken);
  const tree = await getRepoTreeService(octokit, owner, repo);

  res.json({ success: true, data: tree });
};
