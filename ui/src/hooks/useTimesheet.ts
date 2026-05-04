import { useCallback, useEffect, useState } from 'react'
import { api } from '../codex-example/api/client'

export type TimesheetEntry = { id?: number, dayOfWeek: string, projectCode: string, hours: number }
export type Timesheet = { id?: number, employeeId: number, weekStart: string, entries: TimesheetEntry[] }

export function useTimesheet(employeeId: number, weekStart: string) {
  const [timesheet, setTimesheet] = useState<Timesheet>({ employeeId, weekStart, entries: [] })
  const [loading, setLoading] = useState(false)

  const load = useCallback(() => {
    // Avoid calling the API until a valid employee is selected
    if (!employeeId || employeeId <= 0) {
      setTimesheet({ employeeId, weekStart, entries: [] })
      return
    }
    setLoading(true)
    api.get<Timesheet>(`/timesheets/employee/${employeeId}`, { params: { weekStart }})
      .then(r => setTimesheet(r.data))
      .catch(() => setTimesheet({ employeeId, weekStart, entries: [] }))
      .finally(() => setLoading(false))
  }, [employeeId, weekStart])

  useEffect(() => { load() }, [load])

  const save = async (ts: Timesheet) => {
    const { data } = await api.post<Timesheet>('/timesheets', ts)
    setTimesheet(data)
    return data
  }

  return { timesheet, setTimesheet, loading, save, reload: load }
}
