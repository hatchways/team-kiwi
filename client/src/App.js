import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
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

// import "./App.css";
export const history = createBrowserHistory();

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
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
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <Navbar />
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
              <ProfilePage userID={this.state.userId} />
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
