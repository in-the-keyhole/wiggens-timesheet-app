import { useEffect, useState } from 'react'
import { Box, Container, Typography, Paper, Grid, TextField, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material'
import { api } from './codex-example/api/client'

type Metrics = { employeeCount: number, timesheetCount: number }
type Employee = { id: number, firstName: string, lastName: string }

function App() {
  const [metrics, setMetrics] = useState<Metrics>({ employeeCount: 0, timesheetCount: 0 })
  const [employees, setEmployees] = useState<Employee[]>([])
  const [employeeId, setEmployeeId] = useState('')
  const [weekStart, setWeekStart] = useState('')
  const [hours, setHours] = useState({ mon: 8, tue: 8, wed: 8, thu: 8, fri: 8, sat: 0, sun: 0 })

  async function load() {
    const [m, e] = await Promise.all([
      api.get('/metrics').then(r => r.data),
      api.get('/employees').then(r => r.data),
    ])
    setMetrics(m)
    setEmployees(e)
    if (e.length) setEmployeeId(String(e[0].id))
    if (!weekStart) {
      const d = new Date()
      const day = d.getDay()
      const diff = d.getDate() - day + (day === 0 ? -6 : 1)
      const monday = new Date(d.setDate(diff))
      setWeekStart(monday.toISOString().slice(0,10))
    }
  }

  useEffect(() => { load() }, [])

  const submit = async () => {
    await api.post('/timesheets', { employeeId: Number(employeeId), weekStart, ...hours })
    const m = await api.get('/metrics').then(r => r.data)
    setMetrics(m)
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4">Wiggens Timesheet</Typography>
        <Paper sx={{ p:2, my:2 }}>
          <Typography variant="h6">Metrics</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}><strong>Employees:</strong> {metrics.employeeCount}</Grid>
            <Grid item xs={6}><strong>Timesheets:</strong> {metrics.timesheetCount}</Grid>
          </Grid>
        </Paper>

        <Paper sx={{ p:2, my:2 }}>
          <Typography variant="h6">Submit Weekly Timesheet</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="emp-label">Employee</InputLabel>
                <Select labelId="emp-label" value={employeeId} label="Employee" onChange={e => setEmployeeId(String(e.target.value))}>
                  {employees.map(e => (
                    <MenuItem key={e.id} value={e.id}>{e.firstName} {e.lastName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Week Start (Mon)" type="date" value={weekStart} onChange={e => setWeekStart(e.target.value)} InputLabelProps={{ shrink: true }} />
            </Grid>
            {(['mon','tue','wed','thu','fri','sat','sun'] as const).map((d) => (
              <Grid item xs={6} sm={3} key={d}>
                <TextField fullWidth label={d.toUpperCase()} type="number" inputProps={{ min:0, max:24 }}
                  value={(hours as any)[d]}
                  onChange={e => setHours(h => ({ ...h, [d]: Number(e.target.value) }))} />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button variant="contained" onClick={submit}>Submit</Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  )
}

export default App

