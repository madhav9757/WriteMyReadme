import OpenAI from "openai";
import { ENV } from "../../config/env.js";
import { buildReadmePrompt } from "./prompt.builder.js";
import { logger } from "../../utils/logger.js";

/* ------------------- OpenRouter Client ------------------- */
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: ENV.OPENROUTER_API_KEY,
});

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

    /* ------------------- AI Call ------------------- */
    const apiResponse = await client.chat.completions.create({
      model: "meta-llama/llama-3.1-8b-instruct",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.6, // lower = more factual
    });

    const content = apiResponse?.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("AI returned empty README");
    }

    logger.info(`README generated for ${owner}/${repo}`);
    return content;
  } catch (err) {
    logger.error(err, `Failed to generate README for ${owner}/${repo}`);
    throw err;
  }
};
