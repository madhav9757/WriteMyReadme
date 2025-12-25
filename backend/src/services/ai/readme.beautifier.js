import OpenAI from "openai";
import { ENV } from "../../config/env.js";
import { buildBeautifyPrompt } from "./beautify.prompt.js";
import { logger } from "../../utils/logger.js";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: ENV.OPENROUTER_API_KEY,
});

export const beautifyReadmeService = async (rawReadme) => {
  try {
    if (!rawReadme || typeof rawReadme !== "string") {
      throw new Error("Invalid README content");
    }

    const prompt = buildBeautifyPrompt(rawReadme);

    const response = await client.chat.completions.create({
      model: "meta-llama/llama-3.3-70b-instruct:free",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.2,
    });

    const content = response?.choices?.[0]?.message?.content?.trim();

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
