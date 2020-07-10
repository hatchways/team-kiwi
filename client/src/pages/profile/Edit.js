import React, { Fragment, useState } from 'react';

import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Box, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Redirect } from 'react-router-dom';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Edit(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        width: theme.spacing(100),
        height: theme.spacing(130),
      },
    },
    grid: {
      flexGrow: 1,
      padding: theme.spacing(5),
    },
    label: {
      padding: theme.spacing(2),
    },
    box: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    saveBtn: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    button: {
      marginTop: '50px',
    },
  }));
  const classes = useStyles();
  const [firstName, setFirstName] = useState(props.userInfo.firstName);
  const [lastName, setLastName] = useState(props.userInfo.lastName);
  const [email, setEmail] = useState(props.userInfo.email);
  const [gender, setGender] = useState('Other');
  const [birth, setBirth] = useState('1900-01-01');
  const [phoneNumber, setPhoneNumber] = useState('N/A');
  const [address, setAddress] = useState('N/A');
  const [description, setDescription] = useState('N/A');
  const [redirect, setRedirect] = useState(null);
  const [onSuccesful, setOnSuccesful] = useState(false);

  const handleSubmit = (e) => {
    const user = {
      id: props.userInfo.id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      gender: gender,
      birth: birth,
      phoneNumber: phoneNumber,
      address: address,
      description: description,
    };

    axios
      .put(`/profile/${user.id}`, user)
      .then((response) => {
        if (!response.data.error) {
          // If successfully added
          setOnSuccesful(true);
          setRedirect('/profile/edit');
        }
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOnSuccesful(false);
  };
  if (redirect) {
    return (
      <>
        <Redirect to={{ pathname: redirect }} />
        {/* once everthing entered successfully, popup snackbar */}
        <Snackbar open={onSuccesful} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success">
            Successfully Edited!
          </Alert>
        </Snackbar>
      </>
    );
  } else {
    return (
      <Fragment>
        <Container maxWidth="lg" className={classes.root}>
          <Paper elevation={3}>
            <Grid container spacing={3} className={classes.grid}>
              <Grid item xs={12}>
                <Typography variant="h1" align="center" gutterBottom>
                  Edit Profile
                </Typography>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={3} className={classes.label}>
                  <Typography variant="h6" align="right" gutterBottom>
                    FIRST NAME
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="firstName"
                    style={{ margin: 0 }}
                    placeholder="First Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={3} className={classes.label}>
                  <Typography variant="h6" align="right" gutterBottom>
                    LAST NAME
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="lastName"
                    style={{ margin: 0 }}
                    placeholder="Last Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={3} className={classes.label}>
                  <Typography variant="h6" align="right" gutterBottom>
                    GENDER
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <FormControl variant="outlined" className={classes.formControl} fullWidth>
                    <InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Orther">Orther</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={3} className={classes.label}>
                  <Typography variant="h6" align="right" gutterBottom>
                    BIRTH DATE
                  </Typography>
                </Grid>
                <Grid item xs={8} className={classes.label}>
                  <TextField
                    id="date"
                    // label="Birthday"
                    type="date"
                    defaultValue="2010-01-01"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={birth}
                    onChange={(e) => setBirth(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={3} className={classes.label}>
                  <Typography variant="h6" align="right" gutterBottom>
                    EMAIL ADDRESS
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="email"
                    style={{ margin: 0 }}
                    placeholder="john-doe@gmail.com"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={3} className={classes.label}>
                  <Typography variant="h6" align="right" gutterBottom>
                    PHONE NUMBER
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id="phone"
                    style={{ margin: 0 }}
                    placeholder="Phone number"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    variant="outlined"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={3} className={classes.label}>
                  <Typography variant="h6" align="right" gutterBottom>
                    WHERE YOU LIVE
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Grid item xs={8}>
                    <TextField
                      id="address"
                      style={{ margin: 0 }}
                      placeholder="Address"
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid container item xs={12}>
                <Grid item xs={3} className={classes.label}>
                  <Typography variant="h6" align="right" gutterBottom>
                    DESCRIBE YOUR SELF
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Grid item xs={8}>
                    <TextField
                      id="address"
                      style={{ margin: 0 }}
                      placeholder="About you"
                      fullWidth
                      multiline
                      rows={8}
                      margin="normal"
                      variant="outlined"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box className={classes.box}>
              <Button
                variant="contained"
                color="primary"
                className={classes.saveBtn}
                onClick={handleSubmit}
              >
                SAVE
              </Button>
            </Box>
          </Paper>
        </Container>
      </Fragment>
    );
  }
}

export default Edit;
