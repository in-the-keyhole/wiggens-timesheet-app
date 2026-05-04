import { api } from './client'

export type Employee = { id: number; firstName: string; lastName: string }

export async function listEmployees(q?: string) {
  const resp = await api.get<Employee[]>('/employees', { params: q ? { q } : {} })
  return resp.data
}

export async function createEmployee(payload: Omit<Employee, 'id'>) {
  const resp = await api.post<Employee>('/employees', payload)
  return resp.data
}

export async function updateEmployee(id: number, payload: Omit<Employee, 'id'>) {
  const resp = await api.put<Employee>(`/employees/${id}`, payload)
  return resp.data
}

export async function deleteEmployee(id: number) {
  await api.delete(`/employees/${id}`)
}

