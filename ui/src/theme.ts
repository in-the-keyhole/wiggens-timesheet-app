import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5', // indigo
      light: '#6f74dd',
      dark: '#2c387e'
    },
    secondary: {
      main: '#26a69a', // teal
      light: '#64d8cb',
      dark: '#00766c'
    },
    background: {
      default: '#f7f8fb',
      paper: '#ffffff'
    }
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, #3f51b5 0%, #5c6bc0 50%, #26a69a 100%)'
        }
      }
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          transition: 'box-shadow 200ms ease, transform 200ms ease',
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8
        }
      }
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          '&.Mui-selected': {
            background: 'rgba(63,81,181,0.12)'
          }
        }
      }
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 150ms ease',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.02)' }
        }
      }
    }
  }
})

export default theme
