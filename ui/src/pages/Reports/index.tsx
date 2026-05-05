import { useEffect, useState } from 'react'
import { api } from '../../codex-example/api/client'
import { Stack, TextField, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material'

type Row = { employeeId: number; employeeName: string; totalHours: number }

function startOfWeek(d: Date) {
  const date = new Date(d)
  const day = date.getDay()
  const diff = (day === 0 ? -6 : 1) - day
  date.setDate(date.getDate() + diff)
  date.setHours(0,0,0,0)
  return date
}

export default function Reports() {
  const [weekStart, setWeekStart] = useState<string>(() => startOfWeek(new Date()).toISOString().slice(0,10))
  const [rows, setRows] = useState<Row[]>([])

  useEffect(() => {
    api.get<Row[]>(`/reports/weekly-hours`, { params: { weekStart } }).then(r => setRows(r.data))
  }, [weekStart])

  return (
    <Stack spacing={2}>
      <Typography variant="h6">Weekly Hours</Typography>
      <TextField label="Week Start" type="date" value={weekStart} onChange={e => setWeekStart(e.target.value)} sx={{ maxWidth: 240 }} />
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Employee</TableCell>
            <TableCell align='right'>Total Hours</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.employeeId}>
              <TableCell>{r.employeeName}</TableCell>
              <TableCell align='right'>{r.totalHours}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Stack>
  )
}

