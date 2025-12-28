import { octokitFactory } from "../services/github/octokit.factory.js";
import { getRepoTreeService } from "../services/github/repo.service.js";
import { tokenStore } from "../services/auth/token.store.js";

/* --------------------- Get Logged-in User Repos ------------------------- */
export const getUserRepos = async (req, res) => {
  // Get JWT token from cookies
  const jwtToken = req.cookies?.auth_token;
  
  if (!jwtToken) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided"
    });
  }

  // Get GitHub token from token store using JWT
  const githubToken = tokenStore.get(jwtToken);
  
  if (!githubToken) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid session"
    });
  }

  const octokit = octokitFactory(githubToken);

  try {
    const repos = await octokit.rest.repos.listForAuthenticatedUser({
      visibility: "all",
      per_page: 100,
      sort: "updated",
    });

    res.json({
      success: true,
      repos: repos.data.map((r) => ({
        id: r.id,
        name: r.name,
        full_name: r.full_name,
        owner: r.owner.login,
        private: r.private,
        html_url: r.html_url,
        description: r.description,
        updated_at: r.updated_at,
      })),
    });
  } catch (error) {
    console.error("Error fetching repos:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch repositories"
    });
  }
};

/* --------------------------- Get Repo Tree -------------------------------- */
export const getRepoTree = async (req, res) => {
  const { owner, repo } = req.params;

  // Get JWT token from cookies
  const jwtToken = req.cookies?.auth_token;
  
  if (!jwtToken) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token provided"
    });
  }

  // Get GitHub token from token store
  const githubToken = tokenStore.get(jwtToken);
  
  if (!githubToken) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid session"
    });
  }

  try {
    const octokit = octokitFactory(githubToken);
    const tree = await getRepoTreeService(octokit, owner, repo);

    res.json({ success: true, data: tree });
  } catch (error) {
    console.error("Error fetching repo tree:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch repository tree"
    });
  }
};