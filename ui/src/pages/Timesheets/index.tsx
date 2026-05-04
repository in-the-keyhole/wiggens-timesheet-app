import { Button, Grid, MenuItem, Select, TextField, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { Employee, listEmployees, submitTimesheet, TimesheetEntry, TimesheetRequest } from '../../codex-example/api/client'

function mondayOf(date: string) {
  const d = dayjs(date)
  const dow = d.day() // 0=Sun ... 1=Mon
  const delta = dow === 0 ? -6 : 1 - dow
  return d.add(delta, 'day').format('YYYY-MM-DD')
}

export default function Timesheets() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [employeeId, setEmployeeId] = useState<number | ''>('')
  const [weekStart, setWeekStart] = useState(mondayOf(dayjs().format('YYYY-MM-DD')))
  const [hours, setHours] = useState<number[]>(Array(7).fill(0))
  const [submitted, setSubmitted] = useState<string>('')

  useEffect(() => { listEmployees().then(setEmployees).catch(() => setEmployees([])) }, [])

  const dates = useMemo(() => Array.from({ length: 7 }, (_, i) => dayjs(weekStart).add(i, 'day').format('YYYY-MM-DD')), [weekStart])

  const onSubmit = async () => {
    if (!employeeId) return
    const entries: TimesheetEntry[] = dates.map((d, i) => ({ workDate: d, hours: Number(hours[i] || 0) }))
    const req: TimesheetRequest = { employeeId: Number(employeeId), weekStart, entries }
    const resp = await submitTimesheet(req)
    setSubmitted(`Saved ${resp.totalHours} hours for ${resp.employeeName}`)
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}><Typography variant="h5">Enter Weekly Hours</Typography></Grid>
      <Grid item xs={12} md={4}>
        <Select fullWidth displayEmpty value={employeeId} onChange={e => setEmployeeId(Number(e.target.value))}>
          <MenuItem value="" disabled>Select Employee</MenuItem>
          {(Array.isArray(employees) ? employees : []).map(e => (
            <MenuItem key={e.id} value={e.id!}>{e.firstName} {e.lastName}</MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item xs={12} md={4}>
        <TextField type="date" label="Week Start (Mon)" value={weekStart} onChange={e => setWeekStart(mondayOf(e.target.value))} fullWidth InputLabelProps={{ shrink: true }} />
      </Grid>
      {dates.map((d, i) => (
        <Grid item xs={6} md={2} key={d}>
          <TextField type="number" inputProps={{ min: 0, step: 0.5 }} label={d} value={hours[i]}
            onChange={e => { const v = [...hours]; v[i] = Number(e.target.value); setHours(v) }} fullWidth />
        </Grid>
      ))}
      <Grid item xs={12}><Button variant="contained" onClick={onSubmit}>Submit</Button></Grid>
      {submitted && <Grid item xs={12}><Typography color="success.main">{submitted}</Typography></Grid>}
    </Grid>
  )
}

