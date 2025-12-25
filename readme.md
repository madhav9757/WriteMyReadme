# WriteMyReadme

## Overview  
WriteMyReadme is an AI‑powered solution that automatically generates professional GitHub README files.  
- **Backend** – A Node.js/Express API that handles GitHub OAuth, JWT authentication, repository data retrieval, and AI‑based README generation & beautification.  
- **Frontend** – A React/Vite application that provides a user interface for logging in with GitHub, browsing repositories, and generating README content.  

The project stitches together GitHub’s REST API, OpenAI’s language model, and a clean UI to give developers a seamless README creation workflow.

---

## Features  
- **GitHub OAuth Authentication** – Secure login with GitHub, backed by JWT sessions.  
- **Repository Explorer** – Fetch and display the authenticated user’s repositories.  
- **AI README Generation** – Generate a README from scratch using OpenAI’s GPT models.  
- **Readme Beautifier** – Format and polish generated Markdown for a polished look.  
- **Rate‑Limiting & Security** – Helmet, CORS, request logging, and middleware for error handling.  
- **Responsive UI** – Built with React + shadcn/ui components, fully responsive and accessible.  

---

## Tech Stack  

| Category | Technology |
|----------|------------|
| **Backend** | Node.js, Express, OpenAI SDK, Axios, jsonwebtoken, dotenv, cors, helmet, morgan, cookie‑parser, nodemon |
| **Frontend** | React (Vite), shadcn/ui, PostCSS, Tailwind CSS (via shadcn/ui), Vite, React Router |
| **Auth** | GitHub OAuth, JWT |
| **AI** | OpenAI (ChatGPT/Claude) |
| **Utilities** | Async handlers, logger, constants |

---

## Installation  

### Prerequisites  
- Node.js 18+  
- GitHub account  

### 1. Clone the repository  
```bash
git clone https://github.com/madhav9757/WriteMyReadme.git
cd WriteMyReadme
```

### 2. Backend  

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with the variables listed below (see *Environment Variables*).  

```bash
npm run dev   # or npm start for production
```

The backend will listen on the port specified in `PORT` (default `5000`).

### 3. Frontend  

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` by default.

> **Tip**: Run both services concurrently in separate terminals or set up a script in the root `package.json` to start them together.

---

## Usage  

1. Open the frontend URL (`http://localhost:5173`).  
2. Click **Login with GitHub** – you’ll be redirected to GitHub’s OAuth flow.  
3. After authentication, you’ll be returned to the app.  
4. Browse your repositories on the **Dashboard**.  
5. Select a repo → choose **Generate README** → AI will produce a draft.  
6. Optionally click **Beautify** to format the Markdown.  
7. Copy the final README content or download it.

All API interactions are routed through `/api/*` endpoints on the backend.

---

## Project Structure  

```
├── backend
│   ├── src
│   │   ├── app.js               # Express app setup
│   │   ├── server.js            # Server entry point
│   │   ├── config/              # Environment & third‑party config
│   │   ├── controllers/         # Route handlers
│   │   ├── middlewares/         # Express middleware
│   │   ├── routes/              # API route definitions
│   │   ├── services/            # Business logic (AI, GitHub, Auth)
│   │   └── utils/               # Helpers (async, logger, constants)
│   └── package.json
├── frontend
│   ├── src
│   │   ├── App.jsx
│   │   ├── api/                 # API client
│   │   ├── components/          # UI components (Generate, Repo, Auth, UI library)
│   │   ├── context/             # React context (Auth, Theme)
│   │   ├── hooks/               # Custom hooks
│   │   ├── lib/                 # Utility functions
│   │   ├── pages/               # Page components
│   │   ├── routers/             # Router definitions
│   │   └── styles/              # Global CSS
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

- **backend/src/controllers**: Implements API logic – authentication, README generation, repo listing.  
- **backend/src/services**: Contains reusable services (e.g., `github.service.js` for GitHub API calls, `readme.generator.js` for AI generation).  
- **frontend/src/components/ui**: Re‑exports shadcn/ui components for a consistent design system.  
- **frontend/src/pages**: High‑level pages like `Dashboard`, `Login`, `Generate`.  

---

## Environment Variables  

| Variable | Description | Required |
|----------|-------------|----------|
| `NODE_ENV` | Runtime environment (`development`/`production`). | No (defaults to `development`) |
| `PORT` | Backend listening port. | No (defaults to `5000`) |
| `CLIENT_URL` | Frontend URL (used for CORS). | **Yes** |
| `CORS_ORIGIN` | Allowed CORS origin. | No (defaults to `CLIENT_URL`) |
| `JWT_SECRET` | Secret key for signing JWT tokens. | **Yes** |
| `JWT_EXPIRES_IN` | JWT expiry (e.g., `1h`). | No (defaults to `1h`) |
| `GITHUB_CLIENT_ID` | GitHub OAuth app client ID. | **Yes** |
| `GITHUB_CLIENT_SECRET` | GitHub OAuth app client secret. | **Yes** |
| `GITHUB_CALLBACK_URL` | Redirect URL after GitHub OAuth. | **Yes** |
| `GITHUB_ACCESS_TOKEN` | Personal Access Token for GitHub API (optional, used for repo fetching). | **Yes** |
| `OPENAI_API_KEY` | API key for OpenAI services. | **Yes** |
| `OPENROUTER_API_KEY` | (Optional) API key for OpenRouter. | No |

> **Note:** Create a `.env` file in the `backend/` directory containing these variables.

---

## Contributing  

1. Fork the repository.  
2. Create a feature branch (`git checkout -b feature/awesome-feature`).  
3. Commit your changes with clear messages.  
4. Submit a pull request.  

Please follow the existing code style and run tests (if any) before submitting.

---

## License  

This project does not specify a license. Please refer to the repository’s LICENSE file if one is added.
