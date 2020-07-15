import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Typography,
  Toolbar,
  CssBaseline,
  Button,
  Badge,
  Avatar,
  Grid,
} from '@material-ui/core';
import Login from './Login';
import SignUp from './SignUp';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const useStyles = (theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    margin: theme.spacing(1),
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
  const [loggedIn, setLoggedIn] = useState(false);
  const [profileImg, setProfileImg] = useState(null);
  const logout = (event) => {
    event.preventDefault();

    axios
      .post('/users/logout')
      .then((response) => {
        if (response.status === 200) {
          setLoggedIn(false);
          localStorage.clear();
          setRedirect('/');
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('loginToken');
    if (token !== null) {
      setRedirect('/');
      axios.get(`/profile/ref/${props.userID}`).then(({ data }) => {
        setProfileImg(`https://team-kiwi.s3.ca-central-1.amazonaws.com/${data.profileImg}`);
      });
      setLoggedIn(true);
    }
  }, [props.userID]);

  const { classes } = props;
  const invisible = false;

  return (
    <div>
      {loggedIn ? (
        <>
          <CssBaseline />
          <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
              <img src="/images/logo.png" alt="" />
              <Button component={Link} to="/list" className={classes.link}>
                list
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
                src={profileImg}
                component={Link}
                to="/profile"
                className={classes.avatar}
              />
            </Toolbar>
          </AppBar>
        </>
      ) : (
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

                <Login />
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
