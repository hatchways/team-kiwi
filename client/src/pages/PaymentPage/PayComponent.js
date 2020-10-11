import React, { useState, useEffect } from 'react';
// import {  } from '@material-ui/core/styles';
import {
  makeStyles,
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 360,
    height: 125,
    marginTop: theme.spacing(1),
  },
  header: {
    marginTop: theme.spacing(0),
    height: 50,
    padding: theme.spacing(1),
  },
  contents: {
    height: 75,
    padding: theme.spacing(0.5),
  },
  date: {
    float: 'left',
    marginLeft: theme.spacing(0.5),
    marginTop: theme.spacing(1),
  },
  avatar: {
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
}));

export default function PayComponent(props) {
  const classes = useStyles();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [payKey, setKey] = useState();

  useEffect(() => {
    setStart(moment(props.booking.start).format('YYYY-MM-DDTHH:mm'));
    setEnd(moment(props.booking.end).format('YYYY-MM-DDTHH:mm'));
    setKey(props.payKey);
  }, [props]);

  const fullName =
    props.booking.sitterProfile[0].firstName + ' ' + props.booking.sitterProfile[0].lastName;
  const profileImg = process.env.REACT_APP_S3_IMAGE_URL + props.booking.sitterProfile[0].profileImg;

  const handleDate = () => {
    const _start = moment(start);
    const _end = moment(end);
    const endString = () => {
      if (_start.year() === _end.year()) {
        if (_start.month() === _end.month()) {
          if (_start.day() === _end.day()) return _end.format('hA');
          else return _end.format('D MMM, hA');
        } else return _end.format('D MMM, hA');
      } else return _end.format('D MMM YYYY, hA');
    };
    return _start.format('D MMM YYYY, hA-') + endString();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(payKey);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card className={classes.root} variant="outlined">
          <CardActionArea className={classes.button} onClick={handleSubmit}>
            <CardContent className={classes.header}>
              <Typography variant="body" className={classes.date}>
                {handleDate()}
              </Typography>
            </CardContent>
            <CardContent className={classes.contents}>
              <Avatar aria-label="recipe" className={classes.avatar} alt="" src={profileImg} />
              <Typography variant="h6" className={classes.name} gutterBottom>
                {fullName}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </form>
    </>
  );
}
