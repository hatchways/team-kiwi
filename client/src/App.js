import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";

import { theme } from "./themes/theme";
import Navbar from "./components/Navbar";

import "./App.css";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Navbar />
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
