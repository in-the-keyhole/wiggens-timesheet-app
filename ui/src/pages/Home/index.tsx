import { Card, CardContent, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import client from '../../codex-example/api/client'

export default function Home() {
  const [metrics, setMetrics] = useState<{employeeCount:number, timesheetCount:number} | null>(null)
  useEffect(() => {
    client.get('/metrics').then(r => setMetrics(r.data)).catch(() => setMetrics({employeeCount:0, timesheetCount:0}))
  }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card sx={{ background: 'linear-gradient(135deg,#e8eaf6 0%, #ffffff 60%)' }}>
          <CardContent>
            <Typography variant="h5">Employees</Typography>
            <Typography variant="h3">{metrics?.employeeCount ?? '...'}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card sx={{ background: 'linear-gradient(135deg,#fff3e0 0%, #ffffff 60%)' }}>
          <CardContent>
            <Typography variant="h5">Timesheets</Typography>
            <Typography variant="h3">{metrics?.timesheetCount ?? '...'}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}
