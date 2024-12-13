import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, IconButton, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import VehicleManagement from './components/VehicleManagement';
import { useState, useMemo } from 'react';

function App() {
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark' ? {
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
          } : {
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            },
          }),
        },
      }),
    [mode],
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        color: 'text.primary',
        transition: 'all 0.3s',
      }}>
        <Box sx={{
          position: 'fixed',
          top: 16,
          right: 16,
          zIndex: 1000,
        }}>
          <IconButton
            onClick={toggleColorMode}
            color="inherit"
            sx={{
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'background.paper', opacity: 0.9 },
            }}
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>
        <Router>
          <VehicleManagement />
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;