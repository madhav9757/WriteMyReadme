/* ------------------- Build README Prompt ------------------- */
export const buildReadmePrompt = async ({
  owner,
  repo,
  description,
  packageJson,
  folderTree,
  keyFilesContent,
}) => {
  return `
You are a senior software engineer and technical writer.

Your task is to generate a **production-ready, accurate README.md**
for the GitHub repository below by **analyzing the provided repository data**.

────────────────────────
📦 REPOSITORY METADATA
────────────────────────
Owner: ${owner}
Repository: ${repo}
Description: ${description || "Not provided"}

────────────────────────
📁 FOLDER STRUCTURE
────────────────────────
${folderTree || "Not provided"}

────────────────────────
📦 PACKAGE.JSON (Parsed)
────────────────────────
${packageJson ? JSON.stringify(packageJson, null, 2) : "Not provided"}

────────────────────────
📄 KEY SOURCE FILES (Excerpts)
────────────────────────
${keyFilesContent || "Not provided"}

────────────────────────
⚠️ CRITICAL RULES (IMPORTANT)
────────────────────────
- DO NOT invent features or commands
- You MAY infer carefully from:
  • file names
  • imports
  • dependencies
  • scripts
  • folder structure
- If making an inference, phrase it clearly using:
  "Based on the code structure…" or
  "From the detected dependencies…"
- If information is truly unavailable, state:
  "This information is not specified in the repository"
- Do NOT add fake badges, APIs, or configs
- Assume the reader is a developer

────────────────────────
📄 REQUIRED README STRUCTURE
────────────────────────

# ${repo}

## Overview
Summarize the project purpose based on detected code, dependencies, and metadata.

## Features
List observable features inferred from routes, components, services, or scripts.

## Tech Stack
List frameworks, libraries, and tools derived from package.json and imports.

## Installation
Provide setup steps inferred from package.json scripts
(e.g., npm install, npm run dev, npm start).

## Usage
Explain how to run or interact with the project based on scripts or entry files.

## Project Structure
Explain important folders using the folder tree and file roles.

## Environment Variables
List environment variables referenced in the code.
If none are found, say so explicitly.

## Contributing
Provide short, standard contribution guidelines.

## License
Mention detected license or state "Not specified".

────────────────────────
🎯 OUTPUT RULES
────────────────────────
- Output ONLY Markdown
- No explanations or commentary
- No triple backticks
- README must be ready to commit

Generate the README now.
`;
};
