import React, { Fragment } from 'react';

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

function Photo() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        // margin: theme.spacing(1),
        width: theme.spacing(100),
        height: theme.spacing(80),
      },
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing(5),
    },
    uploadBtn: {
      margin: theme.spacing(5),
      padding: theme.spacing(2),
      marginRight: theme.spacing(1),
    },
    deleteBtn: {
      color: theme.palette.text.secondary,
    },
    photo: {
      margin: theme.spacing(5),
      width: theme.spacing(25),
      height: theme.spacing(25),
    },
  }));
  const classes = useStyles();

  return (
    <Fragment>
      <Container maxWidth="lg" className={classes.root}>
        <Paper elevation={3}>
          <Box className={classes.box}>
            <Typography variant="h1" align="center" gutterBottom>
              Profile Photo
            </Typography>
            <Avatar alt="Remy Sharp" src="/images/profile_1.jpg" className={classes.photo} />
            <Typography variant="h6" color="textSecondary">
              Be sure to use a photo that clearly shows your face
            </Typography>
            <Button variant="outlined" color="primary" className={classes.uploadBtn}>
              Upload a file from your device
            </Button>
            <Button color="textSecondary" className={classes.deleteBtn} startIcon={<DeleteIcon />}>
              Delete Photo
            </Button>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default Photo;
