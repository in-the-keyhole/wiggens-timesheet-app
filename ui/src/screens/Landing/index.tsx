import { Alert, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material'
import { useDashboard } from '../../hooks/useDashboard'

export default function Landing() {
  const { summary, loading, error } = useDashboard()

  return (
    <div>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      {loading && <CircularProgress aria-label="loading" />}
      {error && <Alert severity="error">{error}</Alert>}
      {summary && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Employees
                </Typography>
                <Typography variant="h5" data-testid="employee-count">{summary.employeeCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Typography color="text.secondary" gutterBottom>
                  Timesheets
                </Typography>
                <Typography variant="h5" data-testid="timesheet-count">{summary.timesheetCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
      {!loading && !summary && !error && (
        <Typography color="text.secondary">No data yet. Add employees and timesheets to see summary.</Typography>
      )}
    </div>
  )
}
