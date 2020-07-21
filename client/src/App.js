import React, { Component } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { theme } from './themes/theme';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import ListPage from './pages/ListPage/ListPage';
import MessagePage from './pages/MessagePage/MessagePage';
import SitterDetailPage from './pages/SitterDetailPage/SitterDetailPage';
import JobPage from './pages/JobPage/JobPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

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
    return (
      <MuiThemeProvider theme={theme}>
        <Navbar userID={this.state.userId} />
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route exact path="/list">
            <ListPage userID={this.state.userId} />
          </Route>
          <Route exact path="/notifications"></Route>
          <Route exact path="/jobs">
            <JobPage />
          </Route>
          <Route exact path="/payment">
            <PaymentPage />
          </Route>
          <Route exact path="/messages">
            <MessagePage />
          </Route>
          <Route exact path="/profile">
            <ProfilePage userID={this.state.userId} />
          </Route>
          <Route exact path="/details" component={SitterDetailPage} />
        </Switch>
      </MuiThemeProvider>
    );
  }
}

export default App;
