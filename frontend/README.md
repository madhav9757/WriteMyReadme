frontend/
│
├── public/                     # Static assets
│
├── src/
│   ├── api/
│   │   └── api.js              # Axios instance with baseURL and token
│   │
│   ├── components/
│   │   ├── Auth/
│   │   │   ├── GitHubLoginButton.jsx
│   │   │   └── LogoutButton.jsx
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Sidebar.jsx
│   │   ├── Repo/
│   │   │   ├── RepoCard.jsx
│   │   │   └── RepoList.jsx
│   │   ├── Readme/
│   │   │   ├── ReadmeForm.jsx
│   │   │   └── ReadmeDisplay.jsx
│   │   └── UI/                  # Generic UI elements
│   │       ├── Loader.jsx
│   │       ├── Modal.jsx
│   │       └── Toast.jsx
│   │
│   ├── context/
│   │   └── AuthContext.jsx      # JWT token storage & user info
│   │
│   ├── hooks/
│   │   └── useFetchRepos.js     # Fetch repos hook
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── AuthSuccess.jsx
│   │   └── NotFound.jsx
│   │
│   ├── routes/
│   │   └── AppRouter.jsx
│   │
│   ├── styles/
│   │   └── global.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── package.json
└── vite.config.js
