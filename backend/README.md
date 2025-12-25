# README Generator Backend

A production-ready backend for generating GitHub repository README files using AI (OpenAI) and GitHub OAuth.  
Built with **Node.js**, **Express**, and modern best practices.

---

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Rate Limiting](#rate-limiting)
- [Error Handling](#error-handling)
- [Logging](#logging)
- [Future Improvements](#future-improvements)

---

## Features

- GitHub OAuth authentication
- JWT-based session management
- Fetch user repositories and repo trees
- Read files from GitHub repositories
- Generate professional README using OpenAI (GPT-4)
- Rate-limited endpoints for security and cost control
- Structured logging with Pino
- Production-ready, modular architecture

---

## Folder Structure

```
backend/
│
├── src/
│   ├── app.js                 # Express app setup
│   ├── server.js              # Server entry point
│
├── .env
├── .gitignore
├── package.json
└── README.md
```

---

## Environment Variables

Create a `.env` file at the root:

```env
PORT=5000
CLIENT_URL=http://localhost:3000

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback

OPENAI_API_KEY=your_openai_api_key
NODE_ENV=development
```

---

## Installation

```bash
git clone <repo-url>
cd backend
npm install
```

---

## Running the Server

### Development

```bash
npm run dev
```

### Production

```bash
npm run start
```

---

## API Endpoints

### Auth

| Method | Endpoint                     | Description                  |
|--------|------------------------------|------------------------------|
| GET    | `/api/auth/github`            | Start GitHub OAuth flow      |
| GET    | `/api/auth/github/callback`   | GitHub OAuth callback        |
| POST   | `/api/auth/logout`            | Logout user                 |

### Repos

| Method | Endpoint                      | Description                      |
|--------|-------------------------------|----------------------------------|
| GET    | `/api/repos`                   | Get logged-in user repositories |
| GET    | `/api/repos/:owner/:repo/tree` | Get repo tree for a repository  |

### README Generation

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| POST   | `/api/readme/generate`    | Generate README for a repo     |

**Request Body Example:**

```json
{
  "owner": "github-username",
  "repo": "repository-name"
}
```

**Response Example:**

```json
{
  "success": true,
  "data": "# Project README
..."
}
```

---

## Authentication

- **JWT-based**  
- Include in `Authorization` header:  
```http
Authorization: Bearer <jwt_token>
```

- Only authenticated users can access `/repos` and `/readme` endpoints

---

## Rate Limiting

- OAuth endpoints: 20 requests / 15min  
- AI endpoints: 5 requests / 10min  
- General API: 100 requests / 15min  

---

## Error Handling

- All errors handled centrally via `error.middleware.js`
- Returns JSON with status code and message:

```json
{
  "message": "Error description"
}
```

---

## Logging

- **Dev:** colorized, pretty logs  
- **Prod:** structured JSON logs (Pino)  
- Logs include:
  - Service name
  - Timestamps
  - Errors

---

## Future Improvements

- Replace in-memory token store with **Redis** for horizontal scaling  
- Cache AI-generated READMEs to reduce OpenAI costs  
- Add **repo file scanning** for more contextual README prompts  
- Add **unit tests & integration tests**  

---

## License

MIT © [Your Name]
