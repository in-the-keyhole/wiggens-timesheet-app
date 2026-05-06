import { useEffect, useState } from 'react'
import { api } from '../../codex-example/api/client'
import { Card, CardContent, Typography, Grid, Grow } from '@mui/material'

type Metrics = { employees: number; timesheets: number }

export default function Home() {
  const [metrics, setMetrics] = useState<Metrics | null>(null)
  useEffect(() => {
    api.get<Metrics>('/metrics').then(r => setMetrics(r.data))
  }, [])
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <Grow in timeout={500}>
          <Card sx={{ '&:hover': { boxShadow: 3, transform: 'translateY(-1px)' }, transition: 'box-shadow 200ms ease, transform 200ms ease' }}>
            <CardContent>
              <Typography variant="h5">Employees</Typography>
              <Typography variant="h2">{metrics?.employees ?? '...'}</Typography>
            </CardContent>
          </Card>
        </Grow>
      </Grid>
      <Grid item xs={12} md={6}>
        <Grow in timeout={650}>
          <Card sx={{ '&:hover': { boxShadow: 3, transform: 'translateY(-1px)' }, transition: 'box-shadow 200ms ease, transform 200ms ease' }}>
            <CardContent>
              <Typography variant="h5">Timesheets</Typography>
              <Typography variant="h2">{metrics?.timesheets ?? '...'}</Typography>
            </CardContent>
          </Card>
        </Grow>
      </Grid>
    </Grid>
  )
}
