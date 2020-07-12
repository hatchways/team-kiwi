import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Edit from './Edit';
import Photo from './Photo';
import Availability from './Availability';
import Payment from './Payment';
import Security from './Security';
import Settings from './Settings';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';

function ProfilePage(props) {
  const useStyles = makeStyles((theme) => ({
    list: {
      color: theme.palette.text.secondary,
      width: '100%',
      maxWidth: 360,
    },
    listItem: {
      padding: theme.spacing(3),
    },
  }));

  const classes = useStyles();

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  // const tmp = props;
  // const userInfo = props.userInfo;
  // const userId = props.userID;
  // const { firstName } = props.userInfo;
  // const [profile, setProfile] = useState();

  // useEffect(() => {
  // console.log(userId);
  // console.log(userInfo);
  // console.log(firstName);
  // axios.get(`/profile/ref/${props.userID}`).then(({ data }) => {
  // setProfile(data);
  // console.log(profile);
  // console.log(props.location);
  // });
  // }, []);
  const userID = props.userID;

  function ListItemLink(props) {
    const { primary, to, index } = props;

    const CustomLink = React.useMemo(
      () => React.forwardRef((linkProps, ref) => <Link ref={ref} to={to} {...linkProps} />),
      [to]
    );

    return (
      <ListItem
        button
        component={CustomLink}
        className={classes.listItem}
        selected={selectedIndex === index}
        onClick={(event) => handleListItemClick(event, index)}
      >
        <ListItemText primary={primary} />
      </ListItem>
    );
  }

  return (
    <Fragment>
      <Container maxwidth="lg">
        <Box pt={6}>
          <Grid container>
            <Router>
              <Grid container item xs={3}>
                <List className={classes.list}>
                  <ListItemLink to="/profile" primary="Edit Profile" index={0}></ListItemLink>
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
                  <ListItemLink to="/profile/payment" primary="Payment" index={3}></ListItemLink>
                  <ListItemLink to="/profile/security" primary="Security" index={4}></ListItemLink>
                  <ListItemLink to="/profile/settings" primary="Settings" index={5}></ListItemLink>
                </List>
              </Grid>
              <Grid container item xs={9}>
                <Switch>
                  <Route exact path="/profile">
                    <Edit userID={userID} />
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
            </Router>
          </Grid>
        </Box>
      </Container>
    </Fragment>
  );
}

export default ProfilePage;
