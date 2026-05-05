import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline, AppBar, Toolbar, Typography, Container, Button } from '@mui/material'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Employees from './pages/Employees'
import Timesheets from './pages/Timesheets'
import Reports from './pages/Reports'

function App() {
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

