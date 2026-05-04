import { Card, CardContent, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { getMetrics, Metrics } from '../../codex-example/api/client'

export default function Home() {
  const [metrics, setMetrics] = useState<Metrics>({ employeeCount: 0, timesheetCount: 0 })
  useEffect(() => { getMetrics().then(setMetrics).catch(() => {}) }, [])

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5">Employees</Typography>
            <Typography variant="h3">{metrics.employeeCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h5">Timesheets</Typography>
            <Typography variant="h3">{metrics.timesheetCount}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

