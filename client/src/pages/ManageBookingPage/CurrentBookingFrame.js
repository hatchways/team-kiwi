import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CurrentBookingComponent from './CurrentBookingComponent';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 400,
    height: 550,
    marginTop: theme.spacing(3),
  },
  contents: {
    padding: theme.spacing(1),
  },
  title: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(1),
  },
}));

export default function CurrentBookingFrame() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.contents}>
        <Typography variant="h6" align="left" className={classes.title}>
          CURRENT BOOKINGS:
        </Typography>
        <CurrentBookingComponent />
        <CurrentBookingComponent />
        <Typography variant="h6" align="left" className={classes.title}>
          PAST BOOKINGS:
        </Typography>
        <CurrentBookingComponent />
      </CardContent>
    </Card>
  );
}
