const API_BASE = '/api'

export async function fetchCounter() {
  const res = await fetch(`${API_BASE}/counter`)
  if (!res.ok) throw new Error('Failed to load counter')
  return res.json()
}

async function mutate(path: string) {
  const res = await fetch(`${API_BASE}${path}`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to update counter')
  return res.json()
}

export const incrementCounter = () => mutate('/counter/increment')
export const decrementCounter = () => mutate('/counter/decrement')
export const resetCounter = () => mutate('/counter/reset')



