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
      userID: null,
      userEmail: null,
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
        console.log('Get User: There is a user saved in the server session: ', response.data.user);

        this.setState({
          loggedIn: true,
          userID: response.data.user._id,
          userEmail: response.data.user.userEmail,
        });
      } else {
        console.log('Get user: no user');
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
            userInfo={this.state}
          />
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
