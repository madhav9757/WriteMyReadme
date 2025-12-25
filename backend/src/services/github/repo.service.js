/* -------------------- Get Repo Tree Service --------------------- */
export const getRepoTreeService = async (octokit, owner, repo) => {
  // Get default branch first
  const { data: repoData } = await octokit.rest.repos.get({ owner, repo });
  const branch = repoData.default_branch;

  // Get SHA of the branch
  const { data: branchData } = await octokit.rest.repos.getBranch({
    owner,
    repo,
    branch,
  });

  const treeSha = branchData.commit.commit.tree.sha;

  // Get full tree recursively
  const { data: treeData } = await octokit.rest.git.getTree({
    owner,
    repo,
    tree_sha: treeSha,
    recursive: "true",
  });

  // Return structured tree: path + type (blob/tree) + url
  return treeData.tree.map((item) => ({
    path: item.path,
    type: item.type,
    url: item.url,
  }));
};
