import { buildBeautifyPrompt } from "./beautify.prompt.js";
import { logger } from "../../utils/logger.js";
import { callAiWithFallback } from "./ai.client.js";

export const beautifyReadmeService = async (rawReadme) => {
  try {
    if (!rawReadme || typeof rawReadme !== "string") {
      throw new Error("Invalid README content");
    }

    const prompt = buildBeautifyPrompt(rawReadme);

    const content = await callAiWithFallback({
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2, // Low temp for formatting tasks
    });

    if (!content) {
      throw new Error("AI returned empty README");
    }

    logger.info("README beautification successful");
    return content;
  } catch (err) {
    logger.error(err, "Failed to beautify README");
    throw err;
  }
};
