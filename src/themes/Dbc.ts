import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const DbcTheme = createTheme({

    breakpoints: {
        values: {
            xs: 420,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536,
        }
    },

    palette:{
        primary: {
            main: '#1e62fe',
            dark: '#080f26',
            light: '',
            contrastText: '#ffffff',
        },

        secondary: {
            main: red[500],
            dark: red[800],
            light: red[300],
            contrastText: '#ffffff',
        },

        background:{
            default: '#D9D9D9',
            paper: '#ffffff'
        },        
    }
});