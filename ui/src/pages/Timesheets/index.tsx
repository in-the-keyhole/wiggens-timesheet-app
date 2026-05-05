import { useEffect, useMemo, useState } from 'react'
import { api } from '../../codex-example/api/client'
import { Button, Grid, MenuItem, Stack, TextField, Typography, Snackbar, Alert } from '@mui/material'

type Employee = { id: number; firstName: string; lastName: string }
type Timesheet = { employeeId: number; weekStart: string; monday: number; tuesday: number; wednesday: number; thursday: number; friday: number; saturday: number; sunday: number }

function startOfWeek(d: Date) {
  const date = new Date(d)
  const day = date.getDay() // 0..6, 0=Sun
  const diff = (day === 0 ? -6 : 1) - day // make Monday start
  date.setDate(date.getDate() + diff)
  date.setHours(0,0,0,0)
  return date
}

export default function Timesheets() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [employeeId, setEmployeeId] = useState<number | ''>('')
  const [weekStart, setWeekStart] = useState<string>(() => startOfWeek(new Date()).toISOString().slice(0,10))
  const [hours, setHours] = useState<Omit<Timesheet, 'employeeId'|'weekStart'>>({ monday: 0, tuesday: 0, wednesday: 0, thursday: 0, friday: 0, saturday: 0, sunday: 0 })

  useEffect(() => { api.get<Employee[]>('/employees').then(r => setEmployees(r.data)) }, [])

  const total = useMemo(() => Object.values(hours).reduce((a, b) => a + (Number(b)||0), 0), [hours])

  const [snack, setSnack] = useState<{ open: boolean; message: string; severity: 'success'|'error'}>({ open: false, message: '', severity: 'success' })

  const save = async () => {
    if (!employeeId) return
    const payload: Timesheet = { employeeId: Number(employeeId), weekStart, ...hours }
    try {
      await api.post('/timesheets', payload)
      setSnack({ open: true, message: 'Timesheet saved', severity: 'success' })
    } catch (e) {
      setSnack({ open: true, message: 'Failed to save timesheet', severity: 'error' })
    }
  }

  const onHour = (k: keyof typeof hours, v: string) => setHours({ ...hours, [k]: Number(v) })

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Enter Weekly Hours</Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <TextField select label="Employee" value={employeeId} onChange={e => setEmployeeId(Number(e.target.value))} sx={{ minWidth: 240 }}>
          {employees.map(e => <MenuItem key={e.id} value={e.id}>{e.firstName} {e.lastName}</MenuItem>)}
        </TextField>
        <TextField label="Week Start" type="date" value={weekStart} onChange={e => setWeekStart(e.target.value)} />
      </Stack>
      <Grid container spacing={2}>
        {(['monday','tuesday','wednesday','thursday','friday','saturday','sunday'] as const).map((d) => (
          <Grid item xs={6} sm={3} md={2} key={d}>
            <TextField fullWidth label={d[0].toUpperCase() + d.slice(1)} type="number" value={hours[d]} onChange={e => onHour(d, e.target.value)} />
          </Grid>
        ))}
      </Grid>
      <Typography variant="subtitle1">Total: {total}</Typography>
      <Button variant="contained" onClick={save} disabled={!employeeId}>Save</Button>
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert severity={snack.severity} variant="filled" onClose={() => setSnack({ ...snack, open: false })}>{snack.message}</Alert>
      </Snackbar>
    </Stack>
  )
}
