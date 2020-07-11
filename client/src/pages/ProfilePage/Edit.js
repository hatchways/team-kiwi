import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { Box, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import moment from 'moment-timezone';
import InputMask from 'react-input-mask';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

function Edit(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirth] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [dataLoaded, setLoaded] = useState(false);
  const [messageOpen, setOpen] = useState(false);

  useEffect(() => {
    axios.get(`/profile/ref/${props.userID}`).then(({ data }) => {
      console.log(data);
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
      setGender(data.gender);
      setBirth(moment.utc(data.birthDate).format('YYYY-MM-DD'));
      setPhoneNumber(data.phoneNumber);
      setAddress(data.address);
      setDescription(data.description);
      setLoaded(true);
    });
  }, [props.userID]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      userId: props.userID,
      firstName: firstName,
      lastName: lastName,
      // email: email,
      gender: gender,
      birthDate: birthDate,
      phoneNumber: phoneNumber.replace(/ /g, ''),
      address: address,
      description: description,
    };

    console.log(user);

    axios
      .put(`/profile/${props.userID}`, user)
      .then((response) => {
        if (!response.data.error) {
          console.log('success');
          handleClick();
        }
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const classes = useStyles();

  return dataLoaded ? (
    <Fragment>
      <Container maxWidth="lg" className={classes.root}>
        <Paper elevation={3}>
          <form onSubmit={handleSubmit}>
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
                    defaultValue={firstName}
                    type="text"
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
                    defaultValue={lastName}
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
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={gender || 'Other'}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
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
                    type="date"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    defaultValue={birthDate}
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
                    disabled
                    id="email"
                    style={{ margin: 0 }}
                    fullWidth
                    margin="normal"
                    variant="filled"
                    value={email}
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
                  <InputMask
                    mask="999 999 9999"
                    value={phoneNumber}
                    disabled={false}
                    maskChar=" "
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  >
                    {() => (
                      <TextField
                        style={{ margin: 0 }}
                        placeholder="Phone number"
                        fullWidth
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                  </InputMask>
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
                      defaultValue={address}
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
                      defaultValue={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box className={classes.box}>
              <Button type="submit" variant="contained" color="primary" className={classes.saveBtn}>
                SAVE
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
      <Snackbar open={messageOpen} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Saved successfully!
        </Alert>
      </Snackbar>
    </Fragment>
  ) : (
    <Typography component="h1" variant="h1" align="center" className={classes.search} gutterBottom>
      Loading...
    </Typography>
  );
}

export default Edit;
