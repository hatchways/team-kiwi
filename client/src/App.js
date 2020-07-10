import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { theme } from './themes/theme';
import Navbar from './components/Navbar';
import { createBrowserHistory } from 'history';

import Home from './pages/Home';
import List from './pages/List';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import ProfileDetailForm from './components/ProfileDetailForm';
import Jobs from './pages/Jobs';
import Payment from './pages/Payment';

// import "./App.css";
export const history = createBrowserHistory();

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
          userInfo: null,
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

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/list">
              <List />
            </Route>
            <Route exact path="/notifications">
              <Jobs />
            </Route>
            <Route exact path="/jobs">
              <Jobs />
            </Route>
            <Route path="/payment">
              <Payment />
            </Route>
            <Route path="/messages">
              <Messages />
            </Route>
            <Route path="/profile/edit">
              <Profile />
            </Route>
            <Route path="/details" component={ProfileDetailForm} />
            {/* </Route> */}
          </Switch>
        </Router>

        {/* <Route path="/" exact render={(props) => <LoginPage {...props} />} /> */}
      </MuiThemeProvider>
    );
  }
}

export default App;
