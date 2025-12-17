#!/usr/bin/env bash

set -e

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$ROOT_DIR"

echo "==> Starting Dev environment"

if [ ! -d "$ROOT_DIR/frontend/node_modules" ]; then
  echo "==> Installing frontend dependencies..."
  cd "$ROOT_DIR/frontend"
  npm install
  cd "$ROOT_DIR"
fi

if [ -d "$ROOT_DIR/backend" ] && [ -f "$ROOT_DIR/backend/package.json" ]; then
  if [ ! -d "$ROOT_DIR/backend/node_modules" ]; then
    echo "==> Installing backend dependencies..."
    cd "$ROOT_DIR/backend"
    npm install
    cd "$ROOT_DIR"
  fi

  echo "==> Starting backend - port 4000 by default..."
  cd "$ROOT_DIR/backend"
  npm run dev &
  BACKEND_PID=$!
  cd "$ROOT_DIR"
else
  echo "==> No Node backend detected in ./backend (package.json missing). Skipping backend start."
fi

echo "==> Starting frontend (Vite dev server)..."
cd "$ROOT_DIR/frontend"
npm run dev

if [ -n "$BACKEND_PID" ]; then
  echo "==> Stopping backend (PID $BACKEND_PID)..."
  kill "$BACKEND_PID" >/dev/null 2>&1 || true
fi

echo "==> Dev environment stopped."



