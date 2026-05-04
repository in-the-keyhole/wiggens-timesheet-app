import { useEffect, useMemo, useState } from 'react'
import { Employee, listEmployees, createEmployee, updateEmployee, deleteEmployee } from '../../codex-example/api/client'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Tooltip } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

type EmpForm = Omit<Employee, 'id'>

const emptyForm: EmpForm = { firstName: '', lastName: '', email: '', active: true }

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<EmpForm>(emptyForm)
  const [editId, setEditId] = useState<number | null>(null)

  const load = () => listEmployees().then(setEmployees).catch(() => setEmployees([]))
  useEffect(() => { load() }, [])

  const dialogTitle = useMemo(() => editId ? 'Edit Employee' : 'Add Employee', [editId])

  const save = async () => {
    if (editId) await updateEmployee(editId, form as Employee)
    else await createEmployee(form as Employee)
    setOpen(false); setForm(emptyForm); setEditId(null); load()
  }
  const onEdit = (e: Employee) => { setForm({ firstName: e.firstName, lastName: e.lastName, email: e.email, active: e.active }); setEditId(e.id!); setOpen(true) }
  const onDelete = async (id?: number) => { if (!id) return; await deleteEmployee(id); load() }

  return (
    <div>
      <Button variant="contained" onClick={() => { setForm(emptyForm); setEditId(null); setOpen(true) }}>Add Employee</Button>
      <Table size="small" sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>First</TableCell>
            <TableCell>Last</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(Array.isArray(employees) ? employees : []).map(e => (
            <TableRow key={e.id}>
              <TableCell>{e.firstName}</TableCell>
              <TableCell>{e.lastName}</TableCell>
              <TableCell>{e.email}</TableCell>
              <TableCell align="right">
                <Tooltip title="Edit"><IconButton onClick={() => onEdit(e)}><EditIcon /></IconButton></Tooltip>
                <Tooltip title="Delete"><IconButton onClick={() => onDelete(e.id)}><DeleteIcon /></IconButton></Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
          <TextField label="First Name" value={form.firstName} onChange={e => setForm({ ...form, firstName: e.target.value })} />
          <TextField label="Last Name" value={form.lastName} onChange={e => setForm({ ...form, lastName: e.target.value })} />
          <TextField label="Email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

