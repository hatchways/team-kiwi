import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Card, CardActionArea, CardContent, Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 340,
    height: 80,
  },
  header: {
    marginTop: theme.spacing(0),
    height: 50,
    padding: theme.spacing(1),
  },
  contents: {
    padding: theme.spacing(0.5),
  },
  date: {
    float: 'left',
    marginLeft: theme.spacing(0.5),
    marginTop: theme.spacing(1),
  },
  settings: {
    float: 'right',
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
  status: {
    float: 'right',
    marginTop: theme.spacing(1.5),
    marginRight: theme.spacing(1.5),
    color: theme.palette.text.secondary,
  },
}));

export default function MessageComponent(props) {
  const classes = useStyles();
  const [userKey, setKey] = useState();

  useEffect(() => {
    setKey(props.userKey);
  }, [props]);

  const fullName = props.user.firstName + ' ' + props.user.lastName;
  const profileImg = process.env.REACT_APP_S3_IMAGE_URL + props.user.userProfile[0].profileImg;
  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSubmit(userKey);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardActionArea className={classes.root} onClick={handleSubmit}>
          <CardContent className={classes.contents}>
            <Avatar aria-label="recipe" className={classes.avatar} alt="" src={profileImg} />
            <Typography variant="h6" className={classes.name} gutterBottom>
              {fullName}
            </Typography>
          </CardContent>
        </CardActionArea>
        <Divider />
      </form>
    </>
  );
}
