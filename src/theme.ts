import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
          main: '#1976d2',
        },
        secondary: {
          main: '#9c27b0',
          light: '#0462ff',
          dark: '#01ff13',
        },
        background: {
          default: '#ffffff',
          paper: '#b9b1b1',
        },
        error: {
          main: '#ff0d00',
          light: '#ff0d00',
        },
        warning: {
          main: '#f59913',
          light: '#ea9315',
          dark: '#e08f17',
        },
        info: {
          main: '#1bb5fb',
          light: '#42a5f5',
        },
        success: {
          main: '#12f923',
          light: '#2dfb3d',
          dark: '#11e220',
        },
        divider: '#263238',
      },
      typography: {
        fontSize: 14,
        fontFamily: 'Roboto',
      },
});
export default theme;