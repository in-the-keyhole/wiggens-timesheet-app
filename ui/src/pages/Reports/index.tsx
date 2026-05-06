import { Button, Stack, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import client from '../../codex-example/api/client'

type Row = { employeeId: number, employeeName: string, hours: number }

export default function Reports() {
  const [weekStart, setWeekStart] = useState('')
  const [rows, setRows] = useState<Row[]>([])

  const run = async () => {
    const r = await client.get('/reports/weekly-hours', { params: { weekStart } })
    setRows(r.data)
  }

  return (
    <Stack gap={2}>
      <Typography variant="h5">Report Center</Typography>
      <Stack direction="row" gap={2}>
        <TextField type="date" label="Week Start" InputLabelProps={{ shrink: true }} value={weekStart} onChange={e => setWeekStart(e.target.value)} />
        <Button variant="contained" onClick={run} disabled={!weekStart}>Run</Button>
      </Stack>
      {rows.map((r) => (
        <Typography key={r.employeeId}>{r.employeeName}: {r.hours} hours</Typography>
      ))}
    </Stack>
  )
}

