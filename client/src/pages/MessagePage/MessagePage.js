import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  Typography,
  Grid,
  CardContent,
  Paper,
  Card,
  Avatar,
  TextField,
  Button,
  Divider,
  Box,
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
    // flexWrap: 'wrap',
    width: 900,
    height: 800,
  },
  messageGrid: {
    height: '80%',
    overflow: 'auto',
  },
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginLeft: theme.spacing(2),
    marginTop: theme.spacing(1),
  },
  name: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(3),
  },
  send: {
    maxWidth: 300,
    marginLeft: theme.spacing(73),
  },
  receive: {
    maxWidth: 300,
    color: theme.palette.primary,
    margin: theme.spacing(1),
  },
  receiveBox: {
    backgroundColor: '#FFB6C1',
  },
  messageTxt: {
    variant: 'body',
    component: 'p',
  },
}));

function MessagePage(props) {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [userKey, setUserKey] = useState(null);
  const [message, setMessage] = useState();
  const [conversation, setConversation] = useState();

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

  // const getMessages = () => {
  //   const participant = { partner: users[userKey]._id, me: props.userID };

  //   axios.get('/message', participant).then(({ data }) => {
  //     setConversation(data);
  //   });
  // };

  const handleMessage = () => {
    if (userKey) {
      // const participant = { partner: users[userKey]._id, me: props.userID };
      // axios.post('/message', participant).then(({ data }) => {
      //   console.log(data);
      // });
      // console.log(conversation);
      // var chat = [];
      // if (conversation) {
      //   conversation.forEach((message, i) => {
      //     chat.push(
      //       <div className={message.sender === props.userID ? classes.send : classes.receive}>
      //         <Card>
      //           <CardContent className={message.sender !== props.userID && classes.receiveBox}>
      //             <Typography className={classes.messageTxt}>{message.content}</Typography>
      //           </CardContent>
      //         </Card>
      //       </div>
      //     );
      //   });
      // }
    }
    // return chat;
  };

  const sendMessage = () => {
    const participant = { partner: users[userKey]._id, me: props.userID };
    axios.post('/message', participant).then(({ data }) => {
      console.log(data);
    });
  };

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
          <Grid container className={classes.messageGrid}>
            <Box display="flex" flexDirection="column" width="900px">
              {handleMessage()}
            </Box>
          </Grid>
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
                onClick={sendMessage}
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
