import { createTheme } from '@mui/material/styles';
import { blue, pink, red, lightBlue, yellow, teal } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: blue[600],
    },
    secondary: {
      main: pink[600],
    },
    error: {
      main: red[500],
    },
    warning: {
      main: yellow[500],
    },
    info: {
      main: lightBlue[300],
    },
    success: {
      main: teal[400],
    },
    background: {
      default: '#030D22',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
        }
      }
    }
  },
});

export default theme;
