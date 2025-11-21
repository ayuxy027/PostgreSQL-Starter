React + Vite + SQLite Template
===============

**Stack**

- **Frontend**: React 19 + TypeScript + Vite + Tailwind
- **Backend**: Node + Express + SQLite (`better-sqlite3`)
- **DX**: Single `./dev.sh` script from the repo root

**Run it**

```bash
chmod +x ./dev.sh   # first time only
./dev.sh            # starts backend on :4000 and Vite on :5173
```

Then open `http://localhost:5173` – the home page counter is fully backed by SQLite.

**Project layout**

- `frontend/` – React app (landing UI in `src/App.tsx`, hooks in `src/hooks/*`, API clients in `src/api/*`).
- `backend/` – Express app (`server.js`, `app.js`, `routes/*`, `db/sqlite.js`).
- `dev.sh` – Helper to install deps (on first run) and start both apps.

Start editing UI in `frontend/src/App.tsx` and backend logic in `backend/routes/` / `backend/db/sqlite.js`.

**Docs**

- High-level docs live in this `README.md`.
- For a growing project, create a `docs/` directory (e.g. `docs/architecture.md`, `docs/api.md`) and link to those files from here.
- Keep this README as the quick “how to run + where to edit” entry point, and push deeper explanations into `docs/`.