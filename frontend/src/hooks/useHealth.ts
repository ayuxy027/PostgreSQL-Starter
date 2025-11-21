import { useEffect, useState } from 'react'
import { fetchHealth, type HealthResponse } from '../api/health'

export const useHealth = () => {
  const [data, setData] = useState<HealthResponse | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchHealth()
        setData(result)
      } catch (err) {
        console.error(err)
        setData(null)
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [])

  return { data, loading }
}


