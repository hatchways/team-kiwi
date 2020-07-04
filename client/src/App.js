import React, { Component } from 'react';
import { MuiThemeProvider } from "@material-ui/core";
import { BrowserRouter as Router } from "react-router-dom";

import { theme } from "./themes/theme";
import Navbar from "./components/Navbar";

// import "./App.css";

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: true,
      username: null
    }
    // this.getUser = this.getUser.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }
  updateUser(userObject) {
    this.setState(userObject)
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
