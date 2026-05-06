import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom'
import { CssBaseline, AppBar, Toolbar, Typography, Container, Drawer, List, ListItemButton, ListItemText, Box, Divider, Fade } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import Home from './pages/Home'
import Employees from './pages/Employees'
import Timesheets from './pages/Timesheets'
import Reports from './pages/Reports'

const drawerWidth = 220

function Sidebar() {
  const location = useLocation()
  const items = [
    { label: 'Home', to: '/' },
    { label: 'Employees', to: '/employees' },
    { label: 'Timesheets', to: '/timesheets' },
    { label: 'Reports', to: '/reports' }
  ]
  return (
    <Drawer variant="permanent" sx={{
      width: drawerWidth,
      flexShrink: 0,
      [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' }
    }}>
      <Toolbar>
        <Typography variant="h6">Wiggens</Typography>
      </Toolbar>
      <Divider />
      <List>
        {items.map((item) => (
          <ListItemButton key={item.to} component={Link} to={item.to} selected={location.pathname === item.to}>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  )
}

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">Wiggens Timesheet</Typography>
        </Toolbar>
      </AppBar>
      <Sidebar />
      <Box component="main" sx={{
        flexGrow: 1,
        p: 3,
        background: (t) => `radial-gradient(1200px 600px at -10% -10%, rgba(63,81,181,0.06), transparent 50%), radial-gradient(1000px 500px at 110% -20%, rgba(38,166,154,0.06), transparent 50%), ${t.palette.background.default}`,
        minHeight: '100vh'
      }}>
        <Toolbar />
        <Container maxWidth="lg">
          <Fade in key={location.pathname} timeout={400}>
            <Box>{children}</Box>
          </Fade>
        </Container>
      </Box>
    </Box>
  )
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/timesheets" element={<Timesheets />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
