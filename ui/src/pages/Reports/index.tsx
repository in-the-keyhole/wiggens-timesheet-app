import { Grid, TextField, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { getReport, TimesheetSummary } from '../../codex-example/api/client'

function mondayOf(date: string) {
  const d = dayjs(date)
  const dow = d.day()
  const delta = dow === 0 ? -6 : 1 - dow
  return d.add(delta, 'day').format('YYYY-MM-DD')
}

export default function Reports() {
  const [weekStart, setWeekStart] = useState(mondayOf(dayjs().format('YYYY-MM-DD')))
  const [rows, setRows] = useState<TimesheetSummary[]>([])

  const load = async () => { setRows(await getReport(weekStart)) }
  useEffect(() => { load() }, [weekStart])

  const total = useMemo(() => rows.reduce((a, b) => a + (b.totalHours || 0), 0), [rows])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}><Typography variant="h5">Report Center</Typography></Grid>
      <Grid item xs={12} md={4}>
        <TextField type="date" label="Week Start (Mon)" value={weekStart} onChange={e => setWeekStart(mondayOf(e.target.value))} fullWidth InputLabelProps={{ shrink: true }} />
      </Grid>
      <Grid item xs={12}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>Employee</th>
              <th style={{ textAlign: 'right', borderBottom: '1px solid #ddd' }}>Total Hours</th>
            </tr>
          </thead>
          <tbody>
            {(Array.isArray(rows) ? rows : []).map(r => (
              <tr key={r.timesheetId}>
                <td style={{ padding: 8 }}>{r.employeeName}</td>
                <td style={{ padding: 8, textAlign: 'right' }}>{r.totalHours}</td>
              </tr>
            ))}
            <tr>
              <td style={{ padding: 8, fontWeight: 'bold' }}>Total</td>
              <td style={{ padding: 8, textAlign: 'right', fontWeight: 'bold' }}>{total}</td>
            </tr>
          </tbody>
        </table>
      </Grid>
    </Grid>
  )
}

