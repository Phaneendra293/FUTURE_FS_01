# Phaneendra — Portfolio Website

A professional personal portfolio website built with React + Vite and a small Express API for managing projects, blog posts, and contact messages. The app includes a polished responsive UI, dark/light theme toggle, an admin panel (client + server) for CRUD on local JSON storage, and a file-backed database shim for simple deployments.

Key features
- Responsive React UI built with Vite and Tailwind-friendly tooling
- Admin panel for managing projects, blogs, and contact messages
- Small Express API (server.ts) that serves the SPA and exposes /api endpoints
- File-based DB shim at `data/db.json` (seeded via `src/server/db.ts`) for local persistence
- Fallback client-side localStorage mode when the API isn't available

Table of contents
- Project overview
- Tech stack
- Getting started
- Available npm scripts
- Project layout
- API endpoints
- Development notes & deployment

Project overview
This repository contains a single-page React application (entry: `src/main.jsx`, component: `src/App.jsx`) and a minimal Express server (`server.ts`) that exposes a small JSON-backed API. The server uses `src/server/db.ts` as a simple file-backed database (`data/db.json`) and `src/server/routes.ts` to configure routes. During development the Vite server proxies `/api` requests to an in-memory Express instance via a Vite plugin configured in `vite.config.ts`.

Tech stack
- React 19 (client)
- Vite (dev tooling / build)
- Express (server API + static server)
- TypeScript for server utilities (db & routes)
- Tailwind / utility-first styling (configured via `@tailwindcss/vite` plugin)
- Lucide icons for UI icons

Getting started (local development)
1. Install dependencies

   npm install

2. Run the dev server

   npm run dev

   This starts Vite on port 3000 and an Express API mounted by the Vite dev server plugin. Open http://localhost:3000 in your browser.

3. Run the production server build and preview

   npm run build
   npm run preview

   Or run the Node production server directly (this serves the built `dist` folder):

   npm run start

Available npm scripts
- start — Run the production Node server (`tsx server.ts`)
- dev — Start Vite dev server (port 3000, host 0.0.0.0)
- build — Build the client with Vite
- preview — Preview the built site using Vite preview
- clean — Remove `dist` and `server.js` artifacts
- lint — Type-check with `tsc --noEmit`

Project layout
- server.ts — Express production server that serves `dist` and registers API routes
- vite.config.ts — Vite configuration; includes a small Express plugin that mounts API routes during dev
- package.json — Scripts and dependencies
- src/
  - App.jsx — Main React component and admin panel UI
  - main.jsx — React entry file
  - index.css — global styles (Tailwind / utility classes)
  - server/
    - db.ts — File-backed DB shim (reads/writes `data/db.json`) and data seed
    - routes.ts — Express route definitions for /api/projects, /api/blogs, /api/contacts
- data/db.json — (created at runtime) persistence for projects, blogs and messages

API endpoints
The server exposes simple JSON endpoints used by the admin UI and client-side fetches:
- GET /api/projects — list projects
- POST /api/projects — add a project (title, description, tech, githubUrl, liveUrl, category, featured)
- DELETE /api/projects/:id — remove a project
- GET /api/blogs — list blog posts
- POST /api/blogs — add a blog post (title, excerpt, content, tags, readTime)
- DELETE /api/blogs/:id — remove a blog post
- GET /api/contacts — list contact messages
- POST /api/contacts — submit a contact message (name, email, subject, message)
- PUT /api/contacts/:id/read — mark message as read
- DELETE /api/contacts/:id — delete a contact message

Development notes
- The database shim writes to `data/db.json`. The file and folder are created automatically on first run by `src/server/db.ts`.
- In environments where file writes fail (e.g. read-only FS), the server falls back to in-memory state and the client falls back to localStorage.
- The Vite config includes an `express-api-plugin` that mounts the same routes under `/api` during dev so you get a single origin for client and API calls.






