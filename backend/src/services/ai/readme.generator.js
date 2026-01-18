import { buildReadmePrompt } from "./prompt.builder.js";
import { logger } from "../../utils/logger.js";
import { callAiWithFallback } from "./ai.client.js";

/* ------------------- Generate README Service ------------------- */
export const generateReadmeService = async ({
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
}) => {
  try {
    /* ------------------- Build Context-Aware Prompt ------------------- */
    const prompt = await buildReadmePrompt({
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

    /* ------------------- AI Call with Fallback ------------------- */
    const content = await callAiWithFallback({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.6, // lower = more factual
    });

    logger.info(`README generated for ${owner}/${repo}`);
    return content;
  } catch (err) {
    logger.error(err, `Failed to generate README for ${owner}/${repo}`);
    throw err;
  }
};
