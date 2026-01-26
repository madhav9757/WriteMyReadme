import OpenAI from "openai";
import { ENV } from "../../config/env.js";
import { logger } from "../../utils/logger.js";

/* ------------------- Lazy Client Creation ------------------- */
// Create client at request time to ensure fresh env vars
const getClient = () => {
    const apiKey = process.env.OPENROUTER_API_KEY?.trim() || ENV.OPENROUTER_API_KEY;
    logger.info(`Using OpenRouter key starting with: ${apiKey?.substring(0, 15)}...`);

    return new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: apiKey,
        defaultHeaders: {
            "HTTP-Referer": ENV.CLIENT_URL || "http://localhost:5173",
            "X-Title": "WriteMyReadme",
        },
    });
};

/* ------------------- Model Strategy ------------------- */
// We try models in this order. Using current OpenRouter free model IDs.
const MODELS = [
    "mistralai/devstral-2512:free",            // Mistral Devstral (best for code)
    "qwen/qwen3-next-80b-a3b-instruct:free",   // Qwen3 80B
    "nvidia/nemotron-nano-9b-v2:free",         // NVIDIA Nemotron
    "openai/gpt-oss-120b:free",                // OpenAI OSS
    "xiaomi/mimo-v2-flash:free",               // Xiaomi MiMo
];

export const callAiWithFallback = async ({
    messages,
    temperature = 0.7,
    max_tokens = 4000,
}) => {
    let lastError = null;
    const client = getClient(); // Create fresh client each time

    for (const model of MODELS) {
        try {
            logger.info(`Attempting AI generation with model: ${model}`);

            const response = await client.chat.completions.create({
                model,
                messages,
                temperature,
                max_tokens,
                top_p: 1,
            });

            const content = response?.choices?.[0]?.message?.content;

            if (content) {
                logger.info(`AI request successful with model: ${model}`);
                return content;
            }

            logger.warn(`Model ${model} returned empty content, trying next...`);
        } catch (err) {
            lastError = err;

            const status = err.status || err.statusCode;
            const msg = err.message || "Unknown error";

            logger.warn(
                `Model ${model} failed. Status: ${status}, Message: ${msg}. Trying next...`
            );
        }
    }

    logger.error("All OpenRouter models failed to respond. Trying OpenAI fallback.");
    // Try OpenAI directly if an OpenAI API key is provided
    const openAiKey = process.env.OPENAI_API_KEY?.trim();
    if (openAiKey) {
        const openAiClient = new OpenAI({
            apiKey: openAiKey,
        });
        try {
            const response = await openAiClient.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages,
                temperature,
                max_tokens,
                top_p: 1,
            });
            const content = response?.choices?.[0]?.message?.content;
            if (content) {
                logger.info("AI request successful with OpenAI fallback.");
                return content;
            }
        } catch (err) {
            logger.warn(`OpenAI fallback failed. Status: ${err.status || err.statusCode}, Message: ${err.message}`);
        }
    }
    // If OpenAI fallback also fails, throw the original error
    throw lastError || new Error("All AI models failed to generate content. Please check your API keys or credits.");
};
