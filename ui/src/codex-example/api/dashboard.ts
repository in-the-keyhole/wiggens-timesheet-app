import { api } from './client'

export type DashboardSummary = {
  employeeCount: number
  timesheetCount: number
}

export async function getSummary() {
  const { data } = await api.get<DashboardSummary>('/dashboard/summary')
  return data
}

