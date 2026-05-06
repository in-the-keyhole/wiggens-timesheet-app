import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, Switch, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import client from '../../codex-example/api/client'

type Employee = { id?: number, firstName: string, lastName: string, email: string, active: boolean }

export default function Employees() {
  const [rows, setRows] = useState<Employee[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Employee>({ firstName:'', lastName:'', email:'', active:true })

  useEffect(() => { refresh() }, [])
  const refresh = () => client.get('/employees').then(r => setRows(r.data))

  const submit = async () => {
    await client.post('/employees', form)
    setOpen(false); setForm({ firstName:'', lastName:'', email:'', active:true }); refresh()
  }

  return (
    <Stack gap={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">Employee Maintenance</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>Add Employee</Button>
      </Stack>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Active</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(r => (
              <TableRow key={r.id}>
                <TableCell>{r.firstName}</TableCell>
                <TableCell>{r.lastName}</TableCell>
                <TableCell>{r.email}</TableCell>
                <TableCell>{r.active ? 'Yes' : 'No'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          <Stack gap={2} sx={{ mt: 1 }}>
            <TextField label="First Name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
            <TextField label="Last Name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
            <TextField label="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <Stack direction="row" alignItems="center" gap={1}>
              <Switch checked={form.active} onChange={e => setForm({ ...form, active: e.target.checked })} /> Active
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={submit} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  )
}
