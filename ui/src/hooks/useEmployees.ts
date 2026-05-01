import { useEffect, useState } from 'react'
import { api } from '../codex-example/api/client'

export type Employee = { id: number, firstName: string, lastName: string }

export function useEmployees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    api.get<Employee[]>('/employees')
      .then(r => setEmployees(r.data))
      .finally(() => setLoading(false))
  }, [])

  return { employees, loading }
}

