import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import axios from 'axios';
import { theme } from './themes/theme';
import Navbar from './components/Navbar';
import { createBrowserHistory } from 'history';

import LandingPage from './pages/LandingPage/LandingPage';
import ListPage from './pages/ListPage/ListPage';
import MessagePage from './pages/MessagePage/MessagePage';
import SitterDetailPage from './pages/SitterDetailPage/SitterDetailPage';
import JobPage from './pages/JobPage/JobPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ManageBookingPage from './pages/ManageBookingPage/ManageBookingPage';

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
    console.log(this.state.userInfo);
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
          userId: response.data.user.id,
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
              <LandingPage />
            </Route>
            <Route exact path="/list">
              <ListPage userID="5f07d97055aca11393aeda5e" />
            </Route>
            <Route exact path="/notifications">
              <JobPage />
            </Route>
            <Route exact path="/requests">
              <ManageBookingPage userID="5f07d97055aca11393aeda5e" />
            </Route>
            <Route exact path="/jobs">
              <JobPage />
            </Route>
            <Route path="/payment">
              <PaymentPage />
            </Route>
            <Route path="/messages">
              <MessagePage />
            </Route>
            <Route path="/profile">
              {/* <ProfilePage userID={this.state.userId} /> */}
              <ProfilePage userID="5f07d97055aca11393aeda5e" />
            </Route>
            <Route path="/details" component={SitterDetailPage} />
          </Switch>
        </Router>

        {/* <Route path="/" exact render={(props) => <LoginPage {...props} />} /> */}
      </MuiThemeProvider>
    );
  }
}

export default App;
