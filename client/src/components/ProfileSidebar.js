import React, { Fragment } from "react";
import { Switch, Route, Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import Edit from "../pages/profile/Edit";
import Photo from "../pages/profile/Photo";
import Availability from "../pages/profile/Availability";
import Payment from "../pages/profile/Payment";
import Security from "../pages/profile/Security";
import Settings from "../pages/profile/Settings";

function ProfileSidebar() {
  const useStyles = makeStyles((theme) => ({
    list: {
      color: theme.palette.text.secondary,
      width: "100%",
      maxWidth: 360,
    },
    listitem: {
      padding: theme.spacing(3),
    },
  }));

  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  function ListItemLink(props) {
    const { primary, to, index } = props;

    const CustomLink = React.useMemo(
      () =>
        React.forwardRef((linkProps, ref) => (
          <Link ref={ref} to={to} {...linkProps} />
        )),
      [to]
    );

    return (
      <ListItem
        button
        component={CustomLink}
        className={classes.listitem}
        selected={selectedIndex === index}
        onClick={(event) => handleListItemClick(event, index)}
      >
        <ListItemText primary={primary} />
      </ListItem>
    );
  }

  return (
    <Fragment>
      <Container maxWidth="lg" className={classes.container}>
        <Box pt={6}>
          <Grid container>
            <Grid container item xs={3}>
              <List className={classes.list}>
                <ListItemLink
                  to="/profile/edit"
                  primary="Edit Profile"
                  index={0}
                ></ListItemLink>
                <ListItemLink
                  to="/profile/photo"
                  primary="Profile Photo"
                  index={1}
                ></ListItemLink>
                <ListItemLink
                  to="/profile/availability"
                  primary="Your availability"
                  index={2}
                ></ListItemLink>
                <ListItemLink
                  to="/profile/payment"
                  primary="Payment"
                  index={3}
                ></ListItemLink>
                <ListItemLink
                  to="/profile/security"
                  primary="Security"
                  index={4}
                ></ListItemLink>
                <ListItemLink
                  to="/profile/settings"
                  primary="Settings"
                  index={5}
                ></ListItemLink>
              </List>
            </Grid>
            <Grid container item xs={9}>
              <Switch>
                <Route exact path="/profile/edit">
                  <Edit />
                </Route>
                <Route path="/profile/photo">
                  <Photo />
                </Route>
                <Route path="/profile/availability">
                  <Availability />
                </Route>
                <Route path="/profile/payment">
                  <Payment />
                </Route>
                <Route path="/profile/security">
                  <Security />
                </Route>
                <Route path="/profile/settings">
                  <Settings />
                </Route>
              </Switch>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Fragment>
  );
}

export default ProfileSidebar;
