import React, { Component } from 'react';
import { MuiThemeProvider, Typography } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
import ManageRequestPage from './pages/ManageRequestPage/ManageRequestPage';
import ManageJobPage from './pages/ManageJobPage/ManageJobPage';

// import "./App.css";
export const history = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
    this.state = {
      userId: null,
    };
    this.getUser = this.getUser.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  getUser() {
    axios.get('/users/').then((response) => {
      if (response.data.user) {
        this.setState({
          userId: response.data.user.id,
        });
      }
    });
  }

  render() {
    // return this.state.userId ? (
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar userID={this.state.userId} />
          <Switch>
            <Route exact path="/">
              <LandingPage />
            </Route>
            <Route exact path="/list">
              <ListPage userID={this.state.userId} />
            </Route>
            <Route exact path="/notifications">
              <JobPage />
            </Route>
            <Route exact path="/requests">
              {/* <ManageBookingPage userID="5f07d97055aca11393aeda5e" /> */}
              <ManageRequestPage userID={this.state.userId} />
            </Route>
            <Route exact path="/jobs">
              <ManageJobPage userID={this.state.userId} />
            </Route>
            <Route path="/payment">
              <PaymentPage userID={this.state.userId} />
            </Route>
            <Route path="/messages">
              <MessagePage />
            </Route>
            <Route path="/profile">
              <ProfilePage userID={this.state.userId} />
            </Route>
            <Route path="/details" component={SitterDetailPage} />
          </Switch>
        </Router>
      </MuiThemeProvider>
      // )
      // : (
      //   <MuiThemeProvider theme={theme}>
      //     <Router>
      //       <Navbar />
      //       <Typography component="h1" variant="h1" align="center" gutterBottom>
      //         <ListPage />
      //       </Typography>
      //     </Router>
      //   </MuiThemeProvider>
    );
  }
}

export default App;
