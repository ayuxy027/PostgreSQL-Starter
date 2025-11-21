const API_BASE = '/api'

export type HealthResponse = {
  status: string
  systems: {
    api: { status: string }
    database: { status: string; driver: string; file: string }
  }
  timestamp: string
}

export async function fetchHealth(): Promise<HealthResponse> {
  const res = await fetch(`${API_BASE}/health`)
  if (!res.ok) throw new Error('Failed to load health')
  return res.json()
}


