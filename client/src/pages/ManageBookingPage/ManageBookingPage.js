import React, { useState, useEffect } from 'react';
import { makeStyles, Typography, Grid, Card } from '@material-ui/core';
import axios from 'axios';
import moment from 'moment';
import Calendar from './Calendar';
import NextBookingComponent from './NextBookingComponent';
import CurrentBookingFrame from './CurrentBookingFrame';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    width: theme.spacing(50),
  },
  calendar: {
    flexWrap: 'wrap',
    width: 380,
    height: 400,
    marginLeft: theme.spacing(5),
  },
}));

function ManageBookingPage(props) {
  const classes = useStyles();
  const [date, changeDate] = useState(new Date());
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get(`/request/${props.userID}`).then(({ data }) => {
      setRequests(data);
    });
  }, [props.userID]);

  return requests ? (
    <Grid container spacing={0} align="center" justify="center" style={{ marginTop: '2%' }}>
      <Grid maxwidth="md" className={classes.root}>
        <NextBookingComponent />
        <CurrentBookingFrame />
      </Grid>
      <Card className={classes.calendar} elevation={5}>
        <Calendar />
      </Card>
    </Grid>
  ) : (
    <Typography component="h1" variant="h1" align="center" className={classes.search} gutterBottom>
      Loading...
    </Typography>
  );
}

export default ManageBookingPage;
