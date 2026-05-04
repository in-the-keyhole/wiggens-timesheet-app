import axios from 'axios'

export const api = axios.create({
  baseURL: '/codex-example/api/v1'
})

export type Employee = {
  id?: number
  firstName: string
  lastName: string
  email: string
  active?: boolean
}

export const listEmployees = async (): Promise<Employee[]> => {
  const { data } = await api.get<Employee[]>('/employees')
  // Ensure array for safety against malformed responses
  return Array.isArray(data) ? data : []
}

export const createEmployee = async (e: Employee): Promise<Employee> => {
  const { data } = await api.post<Employee>('/employees', e)
  return data
}

export const updateEmployee = async (id: number, e: Employee): Promise<Employee> => {
  const { data } = await api.put<Employee>(`/employees/${id}`, e)
  return data
}

export const deleteEmployee = async (id: number): Promise<void> => {
  await api.delete(`/employees/${id}`)
}

export type Metrics = { employeeCount: number; timesheetCount: number }
export const getMetrics = async (): Promise<Metrics> => {
  const { data } = await api.get<Metrics>('/metrics')
  return data
}

export type TimesheetEntry = { workDate: string; hours: number }
export type TimesheetRequest = { employeeId: number; weekStart: string; entries: TimesheetEntry[] }
export type TimesheetSummary = { timesheetId: number; employeeId: number; employeeName: string; weekStart: string; totalHours: number }

export const submitTimesheet = async (req: TimesheetRequest): Promise<TimesheetSummary> => {
  const { data } = await api.post<TimesheetSummary>('/timesheets', req)
  return data
}

export const getReport = async (weekStart: string): Promise<TimesheetSummary[]> => {
  const { data } = await api.get<TimesheetSummary[]>(`/reports`, { params: { weekStart } })
  return Array.isArray(data) ? data : []
}

