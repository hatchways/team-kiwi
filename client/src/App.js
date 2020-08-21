// import React, { Component } from 'react';
import React, { useState, useEffect } from 'react';
import { MuiThemeProvider } from '@material-ui/core';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { theme } from './themes/theme';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import ListPage from './pages/ListPage/ListPage';
import MessagePage from './pages/MessagePage/MessagePage';
import SitterDetailPage from './pages/SitterDetailPage/SitterDetailPage';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import ManageRequestPage from './pages/ManageRequestPage/ManageRequestPage';
import ManageJobPage from './pages/ManageJobPage/ManageJobPage';

function App() {
  const [userId, setUserID] = useState(null);

  useEffect(() => {
    axios.get('/users/').then((response) => {
      if (response.data.user) {
        setUserID(response.data.user.id);
      }
    });
  });

  return (
    <MuiThemeProvider theme={theme}>
      <Navbar userID={userId} />
      <Switch>
        <Route exact path="/">
          <LandingPage />
        </Route>
        <Route path="/list">
          <ListPage userID={userId} />
        </Route>
        <Route path="/requests">
          <ManageRequestPage userID={userId} />
        </Route>
        <Route path="/jobs">
          <ManageJobPage userID={userId} />
        </Route>
        <Route path="/payment">
          <PaymentPage userID={userId} />
        </Route>
        <Route path="/messages">
          <MessagePage userID={userId} />
        </Route>
        <Route path="/profile">
          <ProfilePage userID={userId} />
        </Route>
        <Route path="/details" component={SitterDetailPage} />
      </Switch>
    </MuiThemeProvider>
  );
}

export default App;
