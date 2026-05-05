import { useEffect, useState } from 'react'
import { api, Employee } from '../../codex-example/api'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

export default function Employees() {
  const [rows, setRows] = useState<Employee[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Employee>({ firstName: '', lastName: '', email: '' })
  const load = () => api.employees.list().then(setRows)
  useEffect(() => { load() }, [])

  const save = async () => {
    if (form.id) await api.employees.update(form.id, form)
    else await api.employees.create(form)
    setOpen(false); setForm({ firstName: '', lastName: '', email: '' }); load()
  }
  const del = async (id: number) => { await api.employees.del(id); load() }

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>Add Employee</Button>
      <Table>
        <TableHead>
          <TableRow><TableCell>First</TableCell><TableCell>Last</TableCell><TableCell>Email</TableCell><TableCell /></TableRow>
        </TableHead>
        <TableBody>
          {rows.map(r => (
            <TableRow key={r.id} hover onClick={() => { setForm(r); setOpen(true) }}>
              <TableCell>{r.firstName}</TableCell>
              <TableCell>{r.lastName}</TableCell>
              <TableCell>{r.email}</TableCell>
              <TableCell align="right">
                <IconButton onClick={e => { e.stopPropagation(); del(r.id!) }}><DeleteIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{form.id ? 'Edit' : 'New'} Employee</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="First Name" fullWidth value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
          <TextField margin="dense" label="Last Name" fullWidth value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
          <TextField margin="dense" label="Email" fullWidth value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={save} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

