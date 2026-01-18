import OpenAI from "openai";
import { ENV } from "../../config/env.js";
import { logger } from "../../utils/logger.js";

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: ENV.OPENROUTER_API_KEY,
    defaultHeaders: {
        "HTTP-Referer": ENV.CLIENT_URL || "http://localhost:5173", // Optional, for including your app on openrouter.ai rankings.
        "X-Title": "WriteMyReadme", // Optional. Shows in rankings on openrouter.ai.
    },
});

/* ------------------- Model Strategy ------------------- */
// We try models in this order.
const MODELS = [
    "google/gemini-2.0-flash-exp:free",        // Best free model
    "mistralai/mistral-7b-instruct:free",      // User requested
    "qwen/qwen-2-7b-instruct:free",            // User requested
    "meta-llama/llama-3-8b-instruct:free",     // Backup
    "microsoft/phi-3-mini-128k-instruct:free", // Last resort
];

export const callAiWithFallback = async ({
    messages,
    temperature = 0.7,
    max_tokens = 4000,
}) => {
    let lastError = null;

    for (const model of MODELS) {
        try {
            logger.info(`Attempting AI generation with model: ${model}`);

            const response = await client.chat.completions.create({
                model,
                messages,
                temperature,
                max_tokens, // Ensure we don't hit token limits
                top_p: 1,
                repetition_penalty: 1,
            });

            const content = response?.choices?.[0]?.message?.content;

            if (content) {
                logger.info(`AI request successful with model: ${model}`);
                return content;
            }

            logger.warn(`Model ${model} returned empty content, trying next...`);
        } catch (err) {
            lastError = err;

            // Log specific error details
            const status = err.status || err.statusCode;
            const msg = err.message || "Unknown error";

            logger.warn(
                `Model ${model} failed. Status: ${status}, Message: ${msg}. Trying next...`
            );
        }
    }

    logger.error("All AI models failed to respond.");
    throw lastError || new Error("All AI models failed to generate content. Please check your OpenRouter API keys or credits.");
};
