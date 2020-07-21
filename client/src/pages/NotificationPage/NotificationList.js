import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '55ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    marginTop: '10px',
  },
}));

export default function NotificationList(props) {
  const classes = useStyles();

  const notificationList = [];
  for (let i = 0; i < props.notifications.length; i++) {
    notificationList.push(
      <>
        <ListItem key={i} alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/images/profile_1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary={`${props.notifications[i]} has requested your service for 2 hours`}
            secondary={
              <Fragment>
                <Typography variant="body2">Dog sitting</Typography>
                <Typography variant="body1" className={classes.inline} color="textPrimary">
                  09/29/2019
                </Typography>
              </Fragment>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </>
    );
  }
  return <List className={classes.root}>{notificationList}</List>;
}
