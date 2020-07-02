import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  typography: {
    fontFamily: '"Roboto"',
    fontSize: 12,
    h1: {
      // could customize the h1 variant as well
      fontSize: 3,
    },
  },
  palette: {
    primary: { main: "#DF1B1B" },
    secondary: { main: "#4caf50" },
  },
});
