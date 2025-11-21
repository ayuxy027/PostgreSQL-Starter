import { useCounter } from '../hooks/useCounter'
import { useHealth } from '../hooks/useHealth'

const HomePage = () => {
  const { count, loading, saving, error, increment, decrement, reset } = useCounter()
  const { data: health } = useHealth()

  return (
    <div className="grid md:grid-cols-2 gap-20 items-start">
      <section className="space-y-6">
        <div className="inline-flex items-center rounded-full border border-stone-200 bg-stone-50 px-4 py-1.5 text-sm font-medium text-stone-600">
          <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-green-500" />
          v0.1 Starter
        </div>

        <h1 className="text-6xl font-bold tracking-tight text-stone-900 leading-[1.05]">
          Full-Stack SQLite Apps,{' '}
          <span className="text-stone-400 underline decoration-dotted font-thin">Simplified.</span>
        </h1>

        <p className="text-xl text-stone-600 leading-relaxed max-w-xl">
          A minimal, opinionated starter kit for shipping hackathon projects fast.
        </p>

        <div className="pt-4 flex flex-col gap-3">
          <div className="flex items-center gap-3 text-base text-stone-500 font-mono bg-stone-50 px-4 py-3 rounded-lg border border-stone-100 w-fit">
            <span className="text-stone-400">$</span>
            <span>./dev.sh</span>
          </div>
          <p className="text-xs text-stone-400">Runs frontend :5173 and backend :4000</p>
        </div>
      </section>

      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-stone-100 to-stone-50 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-500" />
        <div className="relative bg-white rounded-xl border border-stone-200 shadow-sm p-10">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-lg font-semibold text-stone-900">Counter Demo</h3>
              <p className="text-base text-stone-500">Persisted in backend/data.sqlite</p>
            </div>
            <div className="h-12 px-5 flex items-center justify-center rounded-md bg-stone-50 border border-stone-200 text-2xl font-bold tabular-nums text-stone-900 min-w-[96px]">
              {loading ? '...' : count}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-100 text-xs text-red-600 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {error}
            </div>
          )}

          <div className="grid grid-cols-3 gap-4">
            <button
              type="button"
              disabled={loading || saving}
              onClick={decrement}
              className="flex items-center justify-center h-11 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300 text-stone-600 font-medium text-base transition-all active:scale-[0.98]"
            >
              Decrease
            </button>
            <button
              type="button"
              disabled={loading || saving}
              onClick={reset}
              className="flex items-center justify-center h-11 rounded-lg border border-stone-200 bg-white hover:bg-stone-50 hover:border-stone-300 text-stone-600 font-medium text-base transition-all active:scale-[0.98]"
            >
              Reset
            </button>
            <button
              type="button"
              disabled={loading || saving}
              onClick={increment}
              className="flex items-center justify-center h-11 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-base shadow-sm transition-all active:scale-[0.98]"
            >
              Increase
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100 flex justify-between items-center text-[11px] md:text-xs text-stone-400 uppercase tracking-wider font-medium">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    health?.systems.api.status === 'up' ? 'bg-green-500' : 'bg-red-400'
                  }`}
                />
                API
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    health?.systems.database.status === 'up' ? 'bg-green-500' : 'bg-red-400'
                  }`}
                />
                DB
              </span>
            </div>
            <span>SQLite 3</span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage


