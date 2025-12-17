React + Vite + PostgreSQL Template
===============

This is a small, **Hackathon‑ready Starter** I mostly use as my **Go‑to Template** when I need to spin up a
Full‑stack app quickly. Nothing fancy, just a clean React frontend and a simple PostgreSQL‑backed API that
work nicely together.

**Stack**

- **Frontend**: React 19 + TypeScript + Vite + Tailwind
- **Backend**: Node + Express + PostgreSQL + Prisma
- **DX**: Single `./dev.sh` script from the repo root

**Setup**

1. **Start PostgreSQL locally:**
   ```bash
   # macOS
   brew services start postgresql@16
   # Or check if running: pg_isready
   ```

2. **Create database:**
   ```bash
   createdb your_database_name
   ```
   (Replace `your_database_name` with your preferred database name)

3. **Configure backend environment:**
   ```bash
   cd backend
   cp .env.example .env
   ```
   Edit `.env` and update:
   ```env
   DATABASE_URL="postgresql://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/YOUR_DATABASE_NAME?schema=public"
   PORT=4000
   ```
   (Replace `YOUR_USERNAME`, `YOUR_PASSWORD`, and `YOUR_DATABASE_NAME` with your PostgreSQL credentials)

4. **Install and setup backend:**
   ```bash
   cd backend
   npm install
   npm run prisma:generate
   npm run prisma:migrate
   ```
   (When prompted, name the migration: `init`)

**Run it**

```bash
chmod +x ./dev.sh   # first time only
./dev.sh            # starts backend on :4000 and Vite on :5173
```

Then open `http://localhost:5173` – the home page auth system is fully backed by PostgreSQL via Prisma.

**Project layout**

- `frontend/` – React app (landing UI in `src/App.tsx`, hooks in `src/hooks/*`, API clients in `src/api/*`).
- `backend/` – Express app (`src/index.js`, database logic in `src/db.js`).
- `backend/prisma/` – Prisma schema (`schema.prisma`) and migrations.
- `dev.sh` – Helper to install deps (on first run) and start both apps.

Start editing UI in `frontend/src/App.tsx` and backend logic in `backend/src/index.js` / `backend/src/db.js`.

**Prisma Commands**

- `npm run prisma:generate` - Generate Prisma Client after schema changes
- `npm run prisma:migrate` - Create and apply migrations (development)
- `npm run prisma:migrate:deploy` - Apply migrations (production)
- `npm run prisma:push` - Push schema changes without migrations (dev only)
- `npm run prisma:studio` - Open Prisma Studio (database GUI)

**Production**

- Backend: `npm run start` (runs `node src/index.js`)
- Frontend: `npm run build` then serve the `dist/` folder

**Pro Tip**

- For a growing project, create a `docs/` directory (e.g. `docs/architecture.md`, `docs/api.md`) and link to those files from here.
- Keep this README as the quick “how to run + where to edit” entry point, and push deeper explanations into `docs/`.