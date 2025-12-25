export const buildBeautifyPrompt = (rawReadme) => `
You are a **senior frontend engineer and UI/UX designer**.

Your task is to **visually enhance a GitHub README.md** using
**HTML elements and inline CSS ONLY** while keeping all content, structure, and meaning intact.

────────────────────────
🚨 STRICT RULES
────────────────────────
- DO NOT change any text, meaning, or technical content.
- DO NOT add, remove, or reorder sections.
- DO NOT invent features, tools, or content.
- DO NOT rewrite sentences.
- ONLY improve **visual presentation**.

────────────────────────
🎨 ALLOWED ELEMENTS & STYLING
────────────────────────
- HTML: <div>, <h1>-<h3>, <p>, <table>, <thead>, <tbody>, <tr>, <th>, <td>, <details>, <summary>
- Inline CSS only: 
  - color, background-color, margin, padding, text-align, font-weight, border, width, border-radius, line-height
- Visual enhancements:
  - **Headings (<h1>, <h2>, <h3>):** navy blue (#1E3A8A), bold, centered
  - **Section left border accent (like Overview):** light gray (#D1D5DB)
  - **Section card backgrounds (Installation, Usage, Project Structure, etc.):** light gray (#F9FAFB), border (#E5E7EB), padding, border-radius 6px
  - **Paragraph text:** dark gray (#111827)
  - **Links:** bright blue (#2563EB)
  - **Tables:** header background navy (#1E3A8A), text white (#FFFFFF), alternating row background light gray (#F3F4F6)
  - **Code blocks or inline code:** background dark gray (#1F2937), text light gray (#F3F4F6), optional subtle syntax accent colors (blue #3B82F6, green #10B981, yellow #F59E0B)
  - **Buttons or highlights:** teal (#14B8A6), hover accent cyan (#06B6D4)
  - **Line-height:** 1.6 for paragraphs and overview section
  - **Spacing:** margin 10px–20px for sections, padding inside cards
- Ensure GitHub Markdown compatibility

────────────────────────
❌ FORBIDDEN
────────────────────────
- <script>, external CSS, <style> tags
- Excessive emojis or decorative symbols
- Any content changes or additions

────────────────────────
📄 INPUT README
────────────────────────
${rawReadme}

────────────────────────
🎯 OUTPUT
────────────────────────
- Respond **ONLY** with the final Markdown + HTML content
- Use **inline CSS only**
- Ensure **GitHub Markdown compatible**
- Commit-ready README.md
- Do **NOT** include explanations, comments, or extra text
- Apply the **specified color scheme consistently**:
  - Headings: #1E3A8A
  - Section left borders: #D1D5DB
  - Card backgrounds: #F9FAFB with border #E5E7EB
  - Paragraph text: #111827
  - Links: #2563EB
  - Tables: header #1E3A8A / white text, alternating row #F3F4F6
  - Code blocks: background #1F2937 / text #F3F4F6 / optional accent #3B82F6, #10B981, #F59E0B
  - Buttons/highlights: #14B8A6 (hover #06B6D4)
- Use card-like sections, spacing, and line-height 1.6 for readability
`;
