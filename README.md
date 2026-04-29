# Blogger

A full-stack blogging platform where users can read, write, edit, and manage blog posts. Built as a monorepo using Turborepo with a React frontend and an Express/Bun backend.

**Live URL:** https://blogger.ashuttosh.me/

**Test Account:**
- Email: `test@blogger.com`
- Password: `test@123`

Or create your own account via the Sign Up page.

---

## Tech Stack

**Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, React Router, Axios

**Backend:** Express.js, Bun runtime, Prisma ORM, PostgreSQL, JWT authentication, bcrypt

**Infrastructure:** Turborepo monorepo, Docker, Docker Compose, GitHub Actions CI/CD

---

## Features

- Browse all published blog posts on the home page without an account
- Sign up and log in with JWT-based authentication persisted in localStorage
- Write, edit, and delete your own blog posts
- Toggle posts between published (public) and draft (private) states
- View individual blog posts with author information
- Manage all your posts from a personal dashboard

---

## Project Structure

```
.
├── apps/
│   ├── backend/          # Express API server
│   └── frontend/         # React + Vite client
└── packages/
    ├── database/         # Prisma schema, migrations, and client
    ├── eslint-config/    # Shared ESLint configurations
    ├── typescript-config/ # Shared TypeScript configurations
    └── ui/               # Shared React component library
```

---

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | No | Register a new user |
| POST | `/api/auth/login` | No | Login and receive a JWT |
| GET | `/api/auth/me` | Yes | Get the current user |
| GET | `/api/blog/bulk` | No | Get all published posts |
| GET | `/api/blog/:id` | No | Get a single post by ID |
| POST | `/api/blog/publish` | Yes | Create a new post |
| PUT | `/api/blog/edit/:id` | Yes | Edit a post |
| DELETE | `/api/blog/delete/:id` | Yes | Delete a post |
| GET | `/api/blog/myblogs` | Yes | Get all posts by the logged-in user |

---

## Running Locally

**Prerequisites:** Node.js 18+, Bun, PostgreSQL database

1. Clone the repository and install dependencies:

```bash
bun install
```

2. Set up environment variables. Copy the example files and fill in your values:

```bash
cp .env.example .env
cp apps/backend/.env.example apps/backend/.env
cp packages/database/.env.example packages/database/.env
```

3. Run database migrations:

```bash
cd packages/database
bunx prisma migrate deploy
bunx prisma generate
```

4. Start the development servers:

```bash
bun run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:3000`.

---

## Running with Docker

```bash
docker-compose up --build
```

This starts both the backend (port 3000) and frontend (port 5173) in containers.

---

## Deployment

The project uses GitHub Actions for CI/CD. On every push to `main`, Docker images are built and pushed to Docker Hub, then deployed to the production server via SSH.

Required GitHub Secrets: `DOCKER_HUB_USERNAME`, `DOCKER_HUB_ACCESS_TOKEN`, `SERVER_HOST`, `SERVER_USERNAME`, `SERVER_SSH_KEY`, `DATABASE_URL`, `JWT_SECRET`, `PORT`
