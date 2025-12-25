import { octokitFactory } from "./octokit.factory.js";

/* -------------------- Read File From Repo -------------------- */
export const readFile = async (token, owner, repo, path) => {
  if (!token) throw new Error("GitHub token is required");
  if (!owner || !repo || !path) throw new Error("Missing parameters");

  try {
    const octokit = octokitFactory(token);

    const { data } = await octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    });

    if (!data || !data.content) {
      throw new Error(`File not found at path: ${path}`);
    }

    // Decode base64 content
    return Buffer.from(data.content, "base64").toString("utf-8");
  } catch (err) {
    // Add context for better logging
    err.message = `Failed to read file '${path}' from ${owner}/${repo}: ${err.message}`;
    throw err;
  }
};
