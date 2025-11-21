SQLite Template
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

- `frontend/` – React app (counter UI lives in `src/App.tsx`, data hook in `src/hooks/useCounter.ts`).
- `backend/` – Express app (`server.js`, `app.js`, `routes/*`, `db/sqlite.js`).
- `dev.sh` – Helper to install deps (on first run) and start both apps.

Start editing UI in `frontend/src/App.tsx` and backend logic in `backend/routes/` / `backend/db/sqlite.js`.