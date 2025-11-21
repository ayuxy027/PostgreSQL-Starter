import { useCounter } from './hooks/useCounter'

const App = () => {
  const { count, loading, saving, error, increment, decrement, reset } = useCounter()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl shadow-slate-900/60">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400 mb-3">
          SQLite Template
        </p>
        <h1 className="text-2xl font-semibold text-slate-50 mb-2">
          React + TypeScript + Tailwind + SQLite
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          This tiny counter is backed by a real SQLite database via the Node backend.
        </p>

        <div className="flex items-center justify-between gap-3 mb-6">
          <span className="text-sm text-slate-400">Counter value</span>
          <span className="inline-flex h-11 min-w-[4.5rem] items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-2xl font-semibold tabular-nums text-emerald-400">
            {loading ? '…' : count}
          </span>
        </div>

        {error && (
          <p className="mb-4 text-xs text-rose-400 bg-rose-950/30 border border-rose-900/80 rounded-xl px-3 py-2">
            {error}
          </p>
        )}

        <div className="flex gap-3 mb-4">
          <button
            type="button"
            disabled={loading || saving}
            onClick={decrement}
            className="flex-1 rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-800 active:scale-[0.98]"
          >
            Decrement
          </button>
          <button
            type="button"
            disabled={loading || saving}
            onClick={reset}
            className="rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs font-medium text-slate-300 tracking-wide uppercase transition hover:border-slate-600 hover:bg-slate-900 active:scale-[0.98]"
          >
            Reset
          </button>
          <button
            type="button"
            disabled={loading || saving}
            onClick={increment}
            className="flex-1 rounded-xl bg-emerald-500 px-3 py-2 text-sm font-semibold text-emerald-950 shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400 active:scale-[0.98]"
          >
            {saving ? 'Saving…' : 'Increment'}
          </button>
        </div>

        <p className="text-[11px] leading-relaxed text-slate-500">
          Edit <code className="rounded bg-slate-800/80 px-1.5 py-[1px] text-[10px] text-slate-200">frontend/src/App.tsx</code>{' '}
          and <code className="rounded bg-slate-800/80 px-1.5 py-[1px] text-[10px] text-slate-200">backend/server.js</code> to start shaping your app.
        </p>
      </div>
    </div>
  )
}

export default App