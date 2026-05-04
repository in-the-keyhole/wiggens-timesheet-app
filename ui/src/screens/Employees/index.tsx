import { useState } from 'react'
import { Box, Button, CircularProgress, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import { useEmployees } from '../../hooks/useEmployees'

export default function Employees() {
  const { employees, loading, q, search, add, update, remove } = useEmployees()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [editingId, setEditingId] = useState<number | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!firstName.trim() || !lastName.trim()) return
    if (editingId) {
      await update(editingId, { firstName, lastName })
      setEditingId(null)
    } else {
      await add({ firstName, lastName })
    }
    setFirstName('')
    setLastName('')
  }

  const startEdit = (id: number) => {
    const emp = employees.find(e => e.id === id)
    if (!emp) return
    setEditingId(id)
    setFirstName(emp.firstName)
    setLastName(emp.lastName)
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>Employees</Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center" mb={2} component="form" onSubmit={onSubmit}>
        <TextField label="First name" value={firstName} onChange={e => setFirstName(e.target.value)} size="small" />
        <TextField label="Last name" value={lastName} onChange={e => setLastName(e.target.value)} size="small" />
        <Button variant="contained" type="submit">{editingId ? 'Update' : 'Add'}</Button>
        <Box flexGrow={1} />
        <TextField
          label="Search"
          size="small"
          value={q}
          onChange={e => search(e.target.value)}
        />
      </Stack>

      {loading ? <CircularProgress aria-label="loading" /> : (
        <Table size="small" aria-label="employees-table">
          <TableHead>
            <TableRow>
              <TableCell>First</TableCell>
              <TableCell>Last</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map(emp => (
              <TableRow key={emp.id}>
                <TableCell>{emp.firstName}</TableCell>
                <TableCell>{emp.lastName}</TableCell>
                <TableCell align="right">
                  <IconButton aria-label={`edit-${emp.id}`} onClick={() => startEdit(emp.id)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label={`delete-${emp.id}`} onClick={() => remove(emp.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Box>
  )
}

