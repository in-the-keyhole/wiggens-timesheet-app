import { Button, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import client from '../../codex-example/api/client'

type Employee = { id: number, firstName: string, lastName: string }
type Entry = { dayOfWeek: string, hours: number }

const DAYS = ['MONDAY','TUESDAY','WEDNESDAY','THURSDAY','FRIDAY']

export default function Timesheets() {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [employeeId, setEmployeeId] = useState<number | ''>('' as any)
  const [weekStart, setWeekStart] = useState('')
  const [entries, setEntries] = useState<Entry[]>(DAYS.map(d => ({ dayOfWeek: d, hours: 0 })))

  useEffect(() => { client.get('/employees').then(r => setEmployees(r.data)) }, [])

  const canSubmit = useMemo(() => employeeId && weekStart, [employeeId, weekStart])

  const submit = async () => {
    await client.post('/timesheets', { employeeId, weekStart, entries })
    setEntries(DAYS.map(d => ({ dayOfWeek: d, hours: 0 })))
  }

  return (
    <Stack gap={2}>
      <Typography variant="h5">Enter Timesheet</Typography>
      <Stack direction="row" gap={2}>
        <TextField select label="Employee" value={employeeId} onChange={e => setEmployeeId(Number(e.target.value))} sx={{ minWidth: 240 }}>
          {employees.map(e => <MenuItem key={e.id} value={e.id}>{e.firstName} {e.lastName}</MenuItem>)}
        </TextField>
        <TextField type="date" label="Week Start" InputLabelProps={{ shrink: true }} value={weekStart} onChange={e => setWeekStart(e.target.value)} />
      </Stack>
      {entries.map((en, idx) => (
        <Stack direction="row" gap={2} key={en.dayOfWeek} alignItems="center">
          <Typography sx={{ width: 120 }}>{en.dayOfWeek}</Typography>
          <TextField type="number" label="Hours" value={en.hours}
            onChange={e => { const v = [...entries]; v[idx] = { ...en, hours: Number(e.target.value) }; setEntries(v) }} />
        </Stack>
      ))}
      <Button variant="contained" disabled={!canSubmit} onClick={submit}>Submit</Button>
    </Stack>
  )
}

