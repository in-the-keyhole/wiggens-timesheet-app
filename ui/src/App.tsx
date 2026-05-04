import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import { Link, Outlet, useLocation } from 'react-router-dom'

export default function App() {
  const { pathname } = useLocation()
  const linkStyle = { color: 'white', textDecoration: 'none', marginRight: 12 }
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Wiggens Timesheet
          </Typography>
          <Button color={pathname === '/' ? 'secondary' : 'inherit'}>
            <Link to="/" style={linkStyle}>Home</Link>
          </Button>
          <Button color={pathname.startsWith('/employees') ? 'secondary' : 'inherit'}>
            <Link to="/employees" style={linkStyle}>Employees</Link>
          </Button>
          <Button color={pathname.startsWith('/timesheets') ? 'secondary' : 'inherit'}>
            <Link to="/timesheets" style={linkStyle}>Timesheets</Link>
          </Button>
          <Button color={pathname.startsWith('/reports') ? 'secondary' : 'inherit'}>
            <Link to="/reports" style={linkStyle}>Reports</Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </Box>
  )
}

