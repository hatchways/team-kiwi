import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Typography,
  Grid,
  CardContent,
  Paper,
  Avatar,
  TextField,
  Button,
  Divider,
} from '@material-ui/core';
import axios from 'axios';
import MessageComponent from './MessageComponent';

const useStyles = makeStyles((theme) => ({
  list: {
    height: 800,
    overflow: 'auto',
  },
  header: {
    padding: theme.spacing(3.5),
    height: 80,
  },
  titleTop: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  messageRoot: {
    flexWrap: 'wrap',
    width: 900,
    height: 800,
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  name: {
    marginTop: theme.spacing(3.5),
    marginLeft: theme.spacing(3),
  },
}));

function MessagePage(props) {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [userKey, setUserKey] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`/users/all/${props.userID}`).then(({ data }) => {
      setUsers(data);
    });
  }, [props.userID]);

  const handleUsers = () => {
    let userList = [];

    userList.push(
      <>
        <CardContent className={classes.header}>
          <Typography variant="h2" align="left" style={{ fontWeight: '550' }}>
            InBox Messages
          </Typography>
        </CardContent>
        <Divider />
      </>
    );

    users.forEach((user, i) => {
      userList.push(<MessageComponent user={user} userKey={i} onSubmit={selectUser} />);
    });

    return userList;
  };

  const selectUser = (key) => {
    setUserKey(key);
  };

  const handleMessage = () => {};

  const showMessage = () => {
    if (userKey !== null) {
      const placeHolder = `Replay to ${users[userKey].firstName}`;
      const profileImg =
        process.env.REACT_APP_S3_IMAGE_URL + users[userKey].userProfile[0].profileImg;
      return (
        <>
          <Grid container style={{ height: '10%' }}>
            <Avatar aria-label="recipe" className={classes.avatar} alt="" src={profileImg} />
            <Typography variant="h1" align="left" className={classes.name}>
              {users[userKey].firstName} {users[userKey].lastName}
            </Typography>
          </Grid>
          <Divider />

          {/* Chat Window */}
          <Grid container style={{ height: '80%' }}></Grid>
          <Divider />
          {/* Message Input */}
          <Grid container style={{ height: '10%' }}>
            <Grid item xs={9}>
              <TextField
                id="standard-basic"
                placeholder={placeHolder}
                fullWidth
                value={message}
                style={{ padding: '3%' }}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                variant="contained"
                color="primary"
                style={{ width: '150px', height: '45px', marginTop: '5.5%' }}
                onClick={handleMessage}
              >
                SEND
              </Button>
            </Grid>
          </Grid>
        </>
      );
    } else
      return (
        <Typography variant="h6" align="left" className={classes.titleTop}>
          SELECT USER TO MESSAGE
        </Typography>
      );
  };

  return users ? (
    <>
      <Grid container spacing={0} align="center" justify="center">
        <Paper elevation={4} square className={classes.list}>
          {handleUsers()}
        </Paper>
        <Paper elevation={4} square className={classes.messageRoot}>
          {showMessage()}
        </Paper>
      </Grid>
    </>
  ) : (
    <Typography component="h1" variant="h1" align="center" className={classes.search} gutterBottom>
      Loading...
    </Typography>
  );
}

export default MessagePage;
