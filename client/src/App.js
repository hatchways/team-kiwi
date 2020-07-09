import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { theme } from './themes/theme';
import Navbar from './components/Navbar';

// import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
      userInfo: null,
    };
    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }
  componentDidMount() {
    this.getUser();
  }
  updateUser(userObject) {
    this.setState(userObject);
  }
  getUser() {
    axios.get('/users/').then((response) => {
      if (response.data.user) {
        this.setState({
          loggedIn: true,
          userInfo: {
            id: response.data.user.id,
            firstName: response.data.user.firstName,
            lastName: response.data.user.lastName,
            email: response.data.user.userEmail,
          },
        });
      } else {
        this.setState({
          loggedIn: false,
          userEmail: null,
        });
      }
    });
  }
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar
            updateUser={this.updateUser}
            loggedIn={this.state.loggedIn}
            userInfo={this.state.userInfo}
          />
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
