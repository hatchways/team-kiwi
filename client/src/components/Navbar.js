import React, { Fragment, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, CssBaseline, Button, Badge, Avatar, Grid } from '@material-ui/core';
import Login from './Login';
import SignUp from './SignUp';
import Home from '../pages/Home';
import MyJobs from '../pages/MyJobs';
import Messages from '../pages/Messages';
import Profile from '../pages/Profile';
import ProfileDetails from '../pages/ProfileDetails';
import Jobs from '../pages/Jobs';
import Messages from '../pages/Messages';
import Profile from '../pages/Profile';
import Payment from '../pages/Payment';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const useStyles = (theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(1.5),
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  logo: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(0, 5),
  },
  avatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
});

function Navbar(props) {
  const [redirect, setRedirect] = useState(null);

  // logout button event handler
  const logout = (event) => {
    event.preventDefault();

    axios
      .post('/users/logout')
      .then((response) => {
        if (response.status === 200) {
          props.updateUser({
            loggedIn: false,
            username: null,
          });
          setRedirect('/');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const { classes } = props;
  const invisible = false;
  const loggedIn = props.loggedIn;
  const userInfo = props.userInfo;
  return (
    <div>
      {loggedIn ? (
        // if user logged In
        <Fragment>
          <CssBaseline />
          <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <Link to="/" className={classes.logo}>
                <img src="/images/logo.png" alt="" />
              </Link>

              <Button component={Link} to="/profile/details">
                Profile Detail
              </Button>

              <Badge color="secondary" variant="dot" invisible={invisible} className={classes.link}>
                <Button component={Link} to="/notifications">
                  Notifications
                </Button>
              </Badge>
              <Button component={Link} to="/jobs" className={classes.link}>
                My Jobs
              </Button>
              <Badge color="secondary" variant="dot" invisible={invisible} className={classes.link}>

                <Button component={Link} to="/payment">
                  My Payment
                </Button>
              </Badge>
              <Badge color="secondary" variant="dot" invisible={invisible} className={classes.link}>

                <Button component={Link} to="/messages">
                  Messages
                </Button>
              </Badge>

              <Button component={Link} to="#" onClick={logout}>
                logout
              </Button>

              <Avatar
                alt="Remy Sharp"
                src="/images/profile_1.jpg"
                component={Link}
                to="/profile/edit"
                className={classes.avatar}
              />
            </Toolbar>
          </AppBar>

          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/notifications">
              <Jobs />
            </Route>
            <Route path="/jobs">
              <Jobs />
            </Route>
            <Route path="/payment">
              <Payment />
            </Route>
            <Route path="/messages">
              <Messages />
            </Route>
            <Route path="/profile/edit">
              <Profile userInfo={userInfo} />
            </Route>
            <Route path="/profile/details">
              <ProfileDetails userInfo={userInfo} />
            </Route>
          </Switch>
        </Fragment>
      ) : (
        // If user NOT logged In
        <div>
          <Redirect to={{ pathname: redirect }} />

          <AppBar position="static" color="default">
            <Toolbar>
              <img src="/images/logo.png" alt="" />
              <Grid container alignItems="center" justify="flex-end" direction="row" spacing={4}>
                <Link
                  href="#"
                  color="inherit"
                  underline="always"
                  style={{ marginRight: '35px', fontWeight: '700' }}
                >
                  BECOME A SITTER
                </Link>

                <Login updateUser={props.updateUser} />
                <SignUp />
              </Grid>
            </Toolbar>
          </AppBar>
        </div>
      )}
    </div>
  );
}

export default withStyles(useStyles)(Navbar);
