import { useEffect, useState } from 'react'
import { api } from '../../codex-example/api/client'
import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Paper, Typography, Divider, Collapse, Slide } from '@mui/material'

type Employee = { id: number; firstName: string; lastName: string; email: string }

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<Partial<Employee>>({ firstName: '', lastName: '', email: '' })

  const load = () => api.get<Employee[]>('/employees').then(r => setEmployees(r.data))
  useEffect(() => { load() }, [])

  const beginAdd = () => { setForm({ firstName: '', lastName: '', email: '' }); setShowForm(true) }
  const beginEdit = (e: Employee) => { setForm(e); setShowForm(true) }
  const cancel = () => { setShowForm(false); setForm({ firstName: '', lastName: '', email: '' }) }

  const save = async () => {
    if (form.id) await api.put(`/employees/${form.id}`, form)
    else await api.post('/employees', form)
    setShowForm(false); setForm({ firstName: '', lastName: '', email: '' }); load()
  }

  const del = async (id: number) => { await api.delete(`/employees/${id}`); load() }

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Employees</Typography>
        <Button variant="contained" onClick={beginAdd}>Add Employee</Button>
      </Stack>

      <Collapse in={showForm} mountOnEnter unmountOnExit timeout={200}>
        <Slide direction="up" in={showForm} mountOnEnter unmountOnExit timeout={400}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderColor: 'primary.light',
              background: 'linear-gradient(180deg, rgba(63,81,181,0.06) 0%, rgba(38,166,154,0.06) 100%)',
              boxShadow: 1,
              '&:hover': { boxShadow: 3, transform: 'translateY(-1px)' },
              transition: 'box-shadow 200ms ease, transform 200ms ease'
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1 }}>{form.id ? 'Edit Employee' : 'Add Employee'}</Typography>
            <Divider sx={{ mb: 2 }} />
            <Stack spacing={2}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <TextField fullWidth label="First Name" value={form.firstName || ''} onChange={e => setForm({ ...form, firstName: e.target.value })} autoFocus />
                <TextField fullWidth label="Last Name" value={form.lastName || ''} onChange={e => setForm({ ...form, lastName: e.target.value })} />
              </Stack>
              <TextField fullWidth label="Email" value={form.email || ''} onChange={e => setForm({ ...form, email: e.target.value })} />
              <Stack direction="row" spacing={1} justifyContent="flex-end">
                <Button onClick={cancel} color="secondary" variant="outlined">Cancel</Button>
                <Button variant="contained" onClick={save}>Save</Button>
              </Stack>
            </Stack>
          </Paper>
        </Slide>
      </Collapse>

      <Paper variant="outlined">
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
                    <Button size="small" onClick={() => beginEdit(e)}>Edit</Button>
                    <Button size="small" color="error" onClick={() => del(e.id)}>Delete</Button>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Stack>
  )
}
