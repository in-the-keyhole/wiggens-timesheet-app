import { useEffect, useState } from 'react'
import { api, Employee, Timesheet } from '../../codex-example/api'
import { Button, Grid, MenuItem, TextField, Typography } from '@mui/material'

const mondayOf = (d: Date) => {
  const date = new Date(d)
  const day = date.getDay() || 7 // Sunday -> 7
  if (day !== 1) date.setDate(date.getDate() - (day - 1))
  return date.toISOString().slice(0, 10)
}

export default function Timesheets() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [form, setForm] = useState<Timesheet>({ employeeId: 0, weekStart: mondayOf(new Date()), mon: 0, tue: 0, wed: 0, thu: 0, fri: 0, sat: 0, sun: 0 })
  const total = form.mon + form.tue + form.wed + form.thu + form.fri + form.sat + form.sun
  useEffect(() => { api.employees.list().then(setEmployees) }, [])

  const save = async () => { await api.timesheets.upsert(form); alert('Saved!') }

  return (
    <div>
      <Typography variant="h6" gutterBottom>Enter Weekly Hours</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField select fullWidth label="Employee" value={form.employeeId} onChange={e => setForm({ ...form, employeeId: Number(e.target.value) })}>
            <MenuItem value={0} disabled>Select Employee</MenuItem>
            {employees.map(e => <MenuItem key={e.id} value={e.id!}>{e.firstName} {e.lastName}</MenuItem>)}
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField type="date" fullWidth label="Week Start (Monday)" InputLabelProps={{ shrink: true }} value={form.weekStart} onChange={e => setForm({ ...form, weekStart: e.target.value })} />
        </Grid>
        {(['mon','tue','wed','thu','fri','sat','sun'] as const).map((d) => (
          <Grid item xs={12} sm={6} md={3} key={d}>
            <TextField type="number" label={d.toUpperCase()} fullWidth inputProps={{ min: 0, max: 24, step: 0.5 }} value={form[d]} onChange={e => setForm({ ...form, [d]: Number(e.target.value) })} />
          </Grid>
        ))}
        <Grid item xs={12}>
          <Typography variant="subtitle1">Total: {total}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" disabled={!form.employeeId} onClick={save}>Save</Button>
        </Grid>
      </Grid>
    </div>
  )
}

