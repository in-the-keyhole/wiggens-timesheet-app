import { http } from './http'

export type Employee = {
  id?: number
  firstName: string
  lastName: string
  email: string
}

export type Metrics = {
  employeeCount: number
  timesheetCount: number
}

export type Timesheet = {
  id?: number
  employeeId: number
  weekStart: string // ISO date
  mon: number; tue: number; wed: number; thu: number; fri: number; sat: number; sun: number
  total?: number
}

export type ReportItem = { employeeId: number; employeeName: string; totalHours: number }

export const api = {
  metrics: async (): Promise<Metrics> => (await http.get('/metrics')).data,
  employees: {
    list: async (): Promise<Employee[]> => (await http.get('/employees')).data,
    create: async (e: Employee): Promise<Employee> => (await http.post('/employees', e)).data,
    update: async (id: number, e: Employee): Promise<Employee> => (await http.put(`/employees/${id}`, e)).data,
    del: async (id: number): Promise<void> => (await http.delete(`/employees/${id}`)).data
  },
  timesheets: {
    upsert: async (t: Timesheet): Promise<Timesheet> => (await http.post('/timesheets', t)).data
  },
  reports: {
    byWeek: async (weekStart: string): Promise<ReportItem[]> => (await http.get('/reports/week', { params: { weekStart } })).data
  }
}

