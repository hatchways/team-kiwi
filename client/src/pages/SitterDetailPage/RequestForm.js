import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Paper,
  Box,
  Avatar,
  Typography,
  Grid,
  Card,
  GridList,
  GridListTile,
  TextField,
  Button,
  Snackbar,
  CardActions,
  CardContent,
} from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Moment from 'moment-timezone';
import MuiAlert from '@material-ui/lab/Alert';

function RequestForm(props) {
  const useStyles = makeStyles((theme) => ({
    datePicker: {
      marginRight: theme.spacing(1),
      width: 200,
      float: 'left',
    },
    confirmForm: {
      flexWrap: 'wrap',
      width: 400,
      height: 500,
    },
  }));
  const classes = useStyles();

  return (
    <Card className={classes.confirmForm} elevation={5} align="center">
      <Grid>
        <Typography variant="h1" align="center" gutterBottom style={{ marginTop: '35px' }}>
          $14/hr
        </Typography>
        <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
      </Grid>
      <Grid style={{ margin: '35px' }}>
        <Typography variant="subtitle1" align="left" gutterBottom style={{ fontWeight: '800' }}>
          DROP IN
        </Typography>
        <TextField
          disabled
          id="datetime-local"
          type="datetime-local"
          defaultValue={props.start}
          className={classes.datePicker}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid style={{ margin: '35px', marginTop: '65px' }}>
        <Typography variant="subtitle1" align="left" gutterBottom style={{ fontWeight: '800' }}>
          DROP OFF
        </Typography>
        <TextField
          disabled
          id="datetime-local"
          type="datetime-local"
          defaultValue={props.end}
          className={classes.datePicker}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Button variant="contained" size="large" color="primary" style={{ marginTop: '45px' }}>
        SEND REQUEST
      </Button>
    </Card>
  );
}

export default RequestForm;
