# WriteMyReadme

## Overview
WriteMyReadme is an AI‑powered service that automatically generates professional GitHub README files for your repositories.  
- The **backend** handles authentication with GitHub, calls an AI model to generate and beautify README content, and exposes REST endpoints.  
- The **frontend** provides a polished React UI that lets users log in with GitHub, select a repository, and view or download the generated README.

## Features
- **GitHub OAuth** – Secure login via GitHub, with state protection and cookie‑based flow.  
- **Repository Listing** – Fetches the authenticated user’s public repositories for selection.  
- **AI README Generation** – Uses an OpenAI compatible API to produce a README from repository metadata.  
- **Beautification** – Post‑processes the generated text to improve formatting and Markdown quality.  
- **Rate limiting** – Prevents abuse of the API endpoints.  
- **CORS & Security** – Configured with Helmet, CORS, and cookie security flags.  
- **Responsive UI** – Built with React + Vite and a component library (shadcn/ui).  
- **Dark mode & theming** – Theme provider supports light/dark themes.  

## Tech Stack
- **Backend**
  - Node.js (ES modules)
  - Express
  - Helmet, CORS, Morgan, Cookie‑Parser
  - OpenAI SDK (or OpenRouter)
  - Octokit (GitHub API)
  - JWT for session tokens
- **Frontend**
  - React (Vite)
  - shadcn/ui components
  - Vite, PostCSS, ESLint
  - React Router
  - Axios (via custom `api.js`)
- **Other**
  - ESLint, Prettier
  - Vercel deployment configuration (`vercel.json`)

## Installation

```bash
# Clone the repo
git clone https://github.com/madhav9757/WriteMyReadme.git
cd WriteMyReadme

# Install dependencies for both packages
npm install

# (Optional) Build the frontend for production
npm run build
```

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

## Usage

### Running in Development

```bash
# Start the backend
cd backend
npm run dev   # or npm start if dev script not defined

# Start the frontend
cd frontend
npm run dev
```

The frontend will be served on `http://localhost:5173` and the backend on `http://localhost:5000`.  
The frontend automatically points to the backend for API requests.

### Production

```bash
# Backend
cd backend
npm run build   # if a build step exists
npm start

# Frontend
cd frontend
npm run build
# Serve the static files (e.g., with Vercel, Netlify, or a static server)
```

## Project Structure

```
├─ backend/          # Server side
│  ├─ src/
│  │  ├─ config/     # Environment, AI, GitHub, JWT settings
│  │  ├─ services/   # Business logic (AI, Auth, GitHub)
│  │  ├─ controllers/ # Route handlers
│  │  ├─ routes/      # Express routers
│  │  ├─ middlewares/ # Auth, error handling, rate limiting
│  │  ├─ utils/       # Helpers (logger, asyncHandler, constants)
│  │  └─ server.js    # Express app entry point
│  └─ package.json
├─ frontend/         # Client side
│  ├─ src/
│  │  ├─ components/  # UI components (auth, repo, generate, ui primitives)
│  │  ├─ pages/       # Route pages (Login, Dashboard, etc.)
│  │  ├─ routers/     # React Router setup
│  │  ├─ context/     # Auth & theme context
│  │  ├─ api/         # API client wrapper
│  │  ├─ lib/         # Utility helpers
│  │  ├─ styles/      # Global CSS
│  │  └─ main.jsx     # App bootstrap
│  ├─ index.html
│  ├─ vite.config.js
│  └─ package.json
└─ README.md
```

## Environment Variables

The backend expects the following environment variables. They can be set in a `.env` file at the root of `backend/` or via your deployment platform.

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Runtime environment (`development` or `production`) | `production` |
| `PORT` | Port for the Express server | `5000` |
| `CLIENT_URL` | Frontend base URL (used for redirects and CORS) | `https://write-my-readme.vercel.app` |
| `CORS_ORIGIN` | Allowed CORS origin (defaults to `CLIENT_URL`) | `https://write-my-readme.vercel.app` |
| `JWT_SECRET` | Secret key for signing JWTs | `supersecret` |
| `JWT_EXPIRES_IN` | JWT expiry duration | `1h` |
| `GITHUB_CLIENT_ID` | GitHub OAuth App Client ID | `abc123` |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth App Client Secret | `def456` |
| `GITHUB_CALLBACK_URL` | URL GitHub redirects to after auth | `https://write-my-readme.vercel.app/api/auth/callback` |
| `GITHUB_PAT` | Personal Access Token for GitHub API calls | `ghp_XXXXXXXXXXXXXXXXXXXX` |
| `OPENROUTER_API_KEY` | API key for the OpenRouter / OpenAI compatible service | `sk-XXXXXXXXXXXXXXXX` |
| `OPENAI_API_KEY` | (Optional) Standard OpenAI key if used instead of OpenRouter | `sk-XXXXXXXXXXXXXXXX` |

> **Note**: The `OPENAI_API_KEY` is referenced in the AI service, but the environment file requires `OPENROUTER_API_KEY`. Adjust accordingly based on the provider you choose.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit your changes with clear messages.
4. Open a pull request with a description of the changes.

All contributions must follow the project's coding style and pass linting checks.

## License

The license for this project is not specified. If you plan to use or modify it, please add an appropriate license file.