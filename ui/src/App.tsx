import { AppBar, Box, Container, Toolbar, Typography, Drawer, List, ListItem, ListItemButton, ListItemText, Fade } from '@mui/material'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Employees from './pages/Employees'
import Timesheets from './pages/Timesheets'
import Reports from './pages/Reports'

const drawerWidth = 220

export default function App() {
  const location = useLocation()
  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (t) => t.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6">Wiggens Timesheet</Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" sx={{ width: drawerWidth, [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }}}>
        <Toolbar />
        <List>
          {[{to:'/',label:'Home'},{to:'/employees',label:'Employees'},{to:'/timesheets',label:'Timesheets'},{to:'/reports',label:'Reports'}].map(i => (
            <ListItem key={i.to} disablePadding>
              <ListItemButton component={Link} to={i.to} selected={location.pathname === i.to}>
                <ListItemText primary={i.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Container>
          <Fade in key={location.pathname} timeout={300}>
            <Box>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/timesheets" element={<Timesheets />} />
                <Route path="/reports" element={<Reports />} />
              </Routes>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  )
}
