import { createMuiTheme } from '@material-ui/core';

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
      fontSize: 30,
      fontWeight: 500,
    },
    h2: {
      // could customize the h1 variant as well
      fontSize: 20,
      fontWeight: 400,
    },
    h5: {
      fontSize: 18,
      fontWeight: 400,
    },
    h6: {
      fontSize: 15,
      fontWeight: 500,
    },
  },
  palette: {
    primary: { main: '#DF1B1B' },
    secondary: { main: '#4caf50' },
  },
});
