import { useState } from 'react'
import { api, ReportItem } from '../../codex-example/api'
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material'

export default function Reports() {
  const [weekStart, setWeekStart] = useState<string>('')
  const [rows, setRows] = useState<ReportItem[]>([])

  const run = async () => { if (!weekStart) return; setRows(await api.reports.byWeek(weekStart)) }

  return (
    <div>
      <TextField type="date" label="Week Start (Monday)" InputLabelProps={{ shrink: true }} value={weekStart} onChange={e => setWeekStart(e.target.value)} />
      <Button sx={{ ml: 2 }} variant="contained" onClick={run} disabled={!weekStart}>Run</Button>
      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell align="right">Total Hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r, i) => (
            <TableRow key={i}>
              <TableCell>{r.employeeName}</TableCell>
              <TableCell align="right">{r.totalHours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

