import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 360,
    height: 125,
    marginTop: theme.spacing(1),
  },
  header: {
    padding: theme.spacing(1),
  },
  contents: {
    padding: theme.spacing(0.5),
  },
  avatar: {
    backgroundColor: red[500],
    float: 'left',
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginLeft: theme.spacing(1),
  },
  name: {
    float: 'left',
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1.5),
  },
  status: {
    float: 'right',
    marginRight: theme.spacing(1.5),
    color: theme.palette.text.secondary,
  },
}));

export default function CurrentBookingComponent() {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <SettingsIcon />
          </IconButton>
        }
        titleTypographyProps={{ variant: 'h5' }}
        title="5 April 2020, 10-12AM"
        align="left"
        className={classes.header}
      />
      <CardContent className={classes.contents}>
        <Avatar
          aria-label="recipe"
          className={classes.avatar}
          alt="T"
          src="/images/profile_3.jpg"
        />
        <Typography variant="h6" className={classes.name} gutterBottom>
          Jessica Pearson
        </Typography>
        <Typography variant="h6" className={classes.status} gutterBottom>
          Accepted
        </Typography>
      </CardContent>
    </Card>
  );
}
