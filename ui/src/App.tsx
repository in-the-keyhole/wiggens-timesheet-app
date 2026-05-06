import { AppBar, Box, Container, CssBaseline, Toolbar, Typography, Button } from '@mui/material'
import { Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Employees from './pages/Employees'
import Timesheets from './pages/Timesheets'
import Reports from './pages/Reports'

export default function App() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Wiggens Timesheet</Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/employees">Employees</Button>
          <Button color="inherit" component={Link} to="/timesheets">Timesheets</Button>
          <Button color="inherit" component={Link} to="/reports">Reports</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/timesheets" element={<Timesheets />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </Container>
    </Box>
  )
}

