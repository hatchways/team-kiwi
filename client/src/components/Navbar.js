import React, { Fragment } from "react";
import { Switch, Route, Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";

import Home from "../pages/Home";
import MyJobs from "../pages/MyJobs";
import Messages from "../pages/Messages";
import Profile from "../pages/Profile";

const useStyles = makeStyles((theme) => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    display: "flex",
    flexDirection: "row",
    margin: theme.spacing(1.5),
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  logo: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(0, 5),
  },
  avater: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const invisible = false;

  return (
    <Fragment>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Link to="/" className={classes.logo}>
            <img src="/images/logo.png" alt="" />
          </Link>
          <Badge
            color="secondary"
            variant="dot"
            invisible={invisible}
            className={classes.link}
          >
            <Button component={Link} to="/notifications">
              Notifications
            </Button>
          </Badge>
          <Button component={Link} to="/myjobs" className={classes.link}>
            My Jobs
          </Button>
          <Badge
            color="secondary"
            variant="dot"
            invisible={invisible}
            className={classes.link}
          >
            <Button component={Link} to="/messages">
              Messages
            </Button>
          </Badge>
          <Avatar
            alt="Remy Sharp"
            src="/images/profile_1.jpg"
            component={Link}
            to="/profile/edit"
            className={classes.avater}
          />
        </Toolbar>
      </AppBar>

      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/notifications">
          <MyJobs />
        </Route>
        <Route path="/myjobs">
          <MyJobs />
        </Route>
        <Route path="/messages">
          <Messages />
        </Route>
        <Route path="/profile/edit">
          <Profile />
        </Route>
      </Switch>
    </Fragment>
  );
}
