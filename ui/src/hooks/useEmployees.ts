import { useCallback, useEffect, useMemo, useState } from 'react'
import type { Employee } from '../codex-example/api/employees'
import { createEmployee, deleteEmployee, listEmployees, updateEmployee } from '../codex-example/api/employees'

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(false)
  const [q, setQ] = useState('')

  const refresh = useCallback(async (query?: string) => {
    setLoading(true)
    try {
      const data = await listEmployees(query)
      setEmployees(data)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const actions = useMemo(() => ({
    search: async (query: string) => {
      setQ(query)
      await refresh(query)
    },
    add: async (payload: Omit<Employee, 'id'>) => {
      const created = await createEmployee(payload)
      setEmployees(prev => [...prev, created])
      return created
    },
    update: async (id: number, payload: Omit<Employee, 'id'>) => {
      const updated = await updateEmployee(id, payload)
      setEmployees(prev => prev.map(e => e.id === id ? updated : e))
      return updated
    },
    remove: async (id: number) => {
      await deleteEmployee(id)
      setEmployees(prev => prev.filter(e => e.id !== id))
    }
  }), [refresh])

  return { employees, loading, q, setQ, ...actions }
}
