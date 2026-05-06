import { Button, Paper, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import client from '../../codex-example/api/client'

type Employee = { id: number, firstName: string, lastName: string, email: string }

export default function Status() {
  const [weekStart, setWeekStart] = useState('')
  const [rows, setRows] = useState<Employee[]>([])

  const load = async () => {
    const r = await client.get('/status/inactive', { params: { weekStart } })
    setRows(r.data)
  }

  return (
    <Stack gap={2}>
      <Typography variant="h5">Inactive Employees</Typography>
      <Stack direction={{ xs:'column', sm:'row' }} gap={2} alignItems="center">
        <TextField type="date" label="Week Start" InputLabelProps={{ shrink: true }} value={weekStart} onChange={e => setWeekStart(e.target.value)} />
        <Button variant="contained" disabled={!weekStart} onClick={load}>Load</Button>
      </Stack>
      <Paper sx={{ p:2 }}>
        {rows.length === 0 ? (
          <Typography variant="body1">No inactive employees for the selected week.</Typography>
        ) : (
          <Stack gap={1}>
            {rows.map(e => (
              <Typography key={e.id}>{e.firstName} {e.lastName} ({e.email})</Typography>
            ))}
          </Stack>
        )}
      </Paper>
    </Stack>
  )
}

