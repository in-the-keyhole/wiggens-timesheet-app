import { useEffect, useState } from 'react'
import { api, Metrics } from '../../codex-example/api'
import { Card, CardContent, Grid, Typography } from '@mui/material'

export default function Home() {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  useEffect(() => { api.metrics().then(setMetrics) }, [])
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Card><CardContent>
          <Typography variant="h6">Employees</Typography>
          <Typography variant="h4">{metrics?.employeeCount ?? '...'}</Typography>
        </CardContent></Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card><CardContent>
          <Typography variant="h6">Timesheets</Typography>
          <Typography variant="h4">{metrics?.timesheetCount ?? '...'}</Typography>
        </CardContent></Card>
      </Grid>
    </Grid>
  )
}

