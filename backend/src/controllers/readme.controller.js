import { tokenStore } from "../services/auth/token.store.js";
import { generateReadmeService } from "../services/ai/readme.generator.js";
import { beautifyReadmeService } from "../services/ai/readme.beautifier.js";
import { ENV } from "../config/env.js";
import axios from "axios";

/* --------------------- Generate README Controller -------------------- */
export const generateReadme = async (req, res) => {
  try {
    /* --------------------- Resolve GitHub Token --------------------- */
    let githubToken;

    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith("Bearer ")) {
      const jwtToken = authHeader.split(" ")[1];
      if (!tokenStore.has(jwtToken)) {
        return res
          .status(401)
          .json({ success: false, message: "Unauthorized" });
      }
      const storedData = tokenStore.get(jwtToken);
      githubToken = storedData?.githubToken;
    } else {
      githubToken = ENV.GITHUB_PAT;
    }

    const { owner, repo } = req.body;
    if (!owner || !repo) {
      return res.status(400).json({
        success: false,
        message: "Missing 'owner' or 'repo'",
      });
    }

    const headers = {
      Authorization: `Bearer ${githubToken}`,
      Accept: "application/vnd.github+json",
    };

    /* --------------------- Repo Metadata --------------------- */
    const repoRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}`,
      { headers }
    );

    const description = repoRes.data.description;
    const defaultBranch = repoRes.data.default_branch;

    /* --------------------- Repo Tree --------------------- */
    const treeRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/git/trees/${defaultBranch}?recursive=1`,
      { headers }
    );

    const tree = treeRes.data.tree;

    /* --------------------- Clean Folder Tree --------------------- */
    const folderTree = tree
      .filter(
        (f) =>
          !f.path.startsWith("node_modules") &&
          !f.path.startsWith(".git") &&
          !f.path.startsWith("dist")
      )
      .slice(0, 150)
      .map((f) => f.path)
      .join("\n");

    /* --------------------- Helper: Fetch File --------------------- */
    const fetchFile = async (path) => {
      try {
        const res = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
          { headers }
        );
        return Buffer.from(res.data.content, "base64").toString("utf-8");
      } catch {
        return null;
      }
    };

    /* --------------------- package.json --------------------- */
    const packageJsonRaw = await fetchFile("package.json");

    let packageJson = null;
    let scripts = null;
    let dependencies = null;
    let devDependencies = null;

    if (packageJsonRaw) {
      try {
        packageJson = JSON.parse(packageJsonRaw);
        scripts = packageJson.scripts;
        dependencies = packageJson.dependencies;
        devDependencies = packageJson.devDependencies;
      } catch { }
    }

    /* --------------------- Existing README --------------------- */
    const existingReadme = await fetchFile("README.md");

    /* --------------------- Auto-detect Important Files --------------------- */
    const importantFiles = tree
      .filter(
        (f) => f.type === "blob" && /\.(js|ts|jsx|tsx|py|java|go)$/.test(f.path)
      )
      .slice(0, 6);

    let keyFilesContent = "";
    for (const file of importantFiles) {
      const content = await fetchFile(file.path);
      if (content) {
        keyFilesContent += `\n\n// FILE: ${file.path}\n${content.slice(
          0,
          1500
        )}`;
      }
    }

    /* --------------------- Generate README --------------------- */
    const readme = await generateReadmeService({
      owner,
      repo,
      description,
      folderTree,
      packageJson,
      scripts,
      dependencies,
      devDependencies,
      existingReadme,
      keyFilesContent,
    });

    res.json({ success: true, data: readme });
  } catch (err) {
    console.error("README generation error:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to generate README",
    });
  }
};

export const beautifyReadme = async (req, res) => {
  try {
    const { readme } = req.body;

    if (!readme || typeof readme !== "string") {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid 'readme' content in request body",
      });
    }

    const trimmedReadme = readme.trim();

    if (!trimmedReadme) {
      return res.status(400).json({
        success: false,
        message: "'readme' content cannot be empty",
      });
    }

    const beautifiedReadme = await beautifyReadmeService(trimmedReadme);

    if (!beautifiedReadme || typeof beautifiedReadme !== "string") {
      throw new Error("Invalid response from beautifyReadmeService");
    }

    res.json({
      success: true,
      data: beautifiedReadme,
    });
  } catch (err) {
    console.error("README beautification error:", err, { body: req.body });
    res.status(500).json({
      success: false,
      message: "Failed to beautify README",
    });
  }
};
