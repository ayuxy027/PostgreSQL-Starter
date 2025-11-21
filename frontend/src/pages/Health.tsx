import { useHealth } from '../hooks/useHealth'

const HealthPage = () => {
  const { data, loading } = useHealth()

  const apiUp = data?.systems.api.status === 'up'
  const dbUp = data?.systems.database.status === 'up'

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900 mb-2">System health</h1>
        <p className="text-sm text-stone-500">
          This page calls <code className="bg-stone-100 px-1.5 py-0.5 rounded">/api/health</code> and shows
          which pieces of the template are currently up.
        </p>
      </div>

      <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">
        {loading && <p className="text-sm text-stone-500">Checking health…</p>}

        {!loading && !data && (
          <p className="text-sm text-red-600">
            Backend health check failed. The API server is not reachable right now.
          </p>
        )}

        {data && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-700">API</span>
              <span className="inline-flex items-center gap-2 text-xs font-medium">
                <span
                  className={`h-2 w-2 rounded-full ${apiUp ? 'bg-green-500' : 'bg-red-500'}`}
                />
                <span className={apiUp ? 'text-green-600' : 'text-red-600'}>
                  {apiUp ? 'Up' : 'Down'}
                </span>
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-stone-700">Database</span>
              <span className="inline-flex items-center gap-2 text-xs font-medium">
                <span
                  className={`h-2 w-2 rounded-full ${dbUp ? 'bg-green-500' : 'bg-red-500'}`}
                />
                <span className={dbUp ? 'text-green-600' : 'text-red-600'}>
                  {dbUp ? 'Up' : 'Down'}
                </span>
              </span>
            </div>

            <p className="mt-3 text-[11px] text-stone-400">
              Driver: {data.systems.database.driver} · File: {data.systems.database.file}
            </p>

            <p className="text-[11px] text-stone-400">
              Last checked: {new Date(data.timestamp).toLocaleTimeString()}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default HealthPage


