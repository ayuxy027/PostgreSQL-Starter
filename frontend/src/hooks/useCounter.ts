import { useEffect, useState } from 'react'
import {
  fetchCounter,
  incrementCounter,
  decrementCounter,
  resetCounter,
} from '../api/counter'

export const useCounter = () => {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        setError(null)
        const data = await fetchCounter()
        setCount(data.value)
      } catch (err) {
        console.error(err)
        setError('Could not reach the backend API. The server appears to be down.')
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  const runMutation = async (fn: () => Promise<{ value: number }>) => {
    if (saving) return
    try {
      setSaving(true)
      setError(null)
      const data = await fn()
      setCount(data.value)
    } catch (err) {
      console.error(err)
      setError('Failed to update counter. Check backend logs.')
    } finally {
      setSaving(false)
    }
  }

  return {
    count,
    loading,
    saving,
    error,
    increment: () => runMutation(incrementCounter),
    decrement: () => runMutation(decrementCounter),
    reset: () => runMutation(resetCounter),
  }
}



