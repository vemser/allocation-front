import { createTheme } from '@mui/material';
import { red } from '@mui/material/colors';

export const DbcTheme = createTheme({

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
        }
    },


});

