import { useEffect, useState } from 'react'
import { api } from '../../codex-example/api/client'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'

type Employee = { id: number; firstName: string; lastName: string; email: string }

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Partial<Employee>>({ firstName: '', lastName: '', email: '' })

  const load = () => api.get<Employee[]>('/employees').then(r => setEmployees(r.data))
  useEffect(() => { load() }, [])

  const save = async () => {
    if (form.id) await api.put(`/employees/${form.id}`, form)
    else await api.post('/employees', form)
    setOpen(false); setForm({ firstName: '', lastName: '', email: '' }); load()
  }

  const edit = (e: Employee) => { setForm(e); setOpen(true) }
  const del = async (id: number) => { await api.delete(`/employees/${id}`); load() }

  return (
    <>
      <Stack direction="row" justifyContent="flex-end" sx={{ mb: 1 }}>
        <Button variant="contained" onClick={() => setOpen(true)}>Add Employee</Button>
      </Stack>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell width={180}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map(e => (
            <TableRow key={e.id}>
              <TableCell>{e.firstName} {e.lastName}</TableCell>
              <TableCell>{e.email}</TableCell>
              <TableCell>
                <Stack direction="row" spacing={1}>
                  <Button size="small" onClick={() => edit(e)}>Edit</Button>
                  <Button size="small" color="error" onClick={() => del(e.id)}>Delete</Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{form.id ? 'Edit' : 'Add'} Employee</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="First Name" value={form.firstName || ''} onChange={e => setForm({ ...form, firstName: e.target.value })} />
            <TextField label="Last Name" value={form.lastName || ''} onChange={e => setForm({ ...form, lastName: e.target.value })} />
            <TextField label="Email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

