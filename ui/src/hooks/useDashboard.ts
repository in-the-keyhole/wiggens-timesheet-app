import { useCallback, useEffect, useState } from 'react'
import { DashboardSummary, getSummary } from '../codex-example/api/dashboard'

export function useDashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getSummary()
      setSummary(data)
    } catch (e) {
      setError('Failed to load dashboard summary')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  return { summary, loading, error, reload: load }
}

