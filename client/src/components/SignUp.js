import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  withStyles,
  InputLabel,
  Link,
  Typography,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const useStyles = (theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: '50vw',
  },
  title: {
    textAlign: 'center',
    fontWeight: '1000',
  },
  inputLabel: {
    fontWeight: '900',
    fontSize: '12px',
  },
  errMsg: {
    width: '100%',
  },
});
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function SignUp(props) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [emailErr, setEmailErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');
  const [onSuccesful, setOnSuccesful] = useState(false);
  const [existEmailErr, setExistEmailErr] = useState(false);
  const [redirect, setRedirect] = useState(null);

  const handleSubmit = (e) => {
    const isValid = validate();
    if (isValid) {
      /////////// START here to store the data in the back//////////
      const user = {
        firstName: firstName,
        lastName: lastName,
        userEmail: email,
        password: password,
      };
      axios
        .post('/users/add', user)
        .then((response) => {
          // console.log(response)
          if (!response.data.error) {
            // clear form and set the sucessful switch to true
            setEmail('');
            // setName('');
            setPassword('');
            setNameErr('');
            setEmailErr('');
            setPasswordErr('');
            setOpen(false);
            setOnSuccesful(true);
            setExistEmailErr(false);
            setRedirect('/');
          } else {
            // if the email is already exist in the database.
            setExistEmailErr(true);
            setRedirect(null);
          }
        })
        .catch((error) => {
          console.log('signup error: ');
          console.log(error);
        });
    }
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOnSuccesful(false);
    setExistEmailErr(false);
  };

  const validate = () => {
    let nameErr = '';
    let emailErr = '';
    let passwordErr = '';

    if (!firstName || !lastName) {
      nameErr = 'Name cannot be blank';
    }

    if (!email.includes('@')) {
      emailErr = 'Invalid email';
    }
    if (password.length < 6) {
      passwordErr = 'Password Can not be less than 6 length';
    }

    if (emailErr || nameErr || passwordErr) {
      setEmailErr(emailErr);
      setNameErr(nameErr);
      setPasswordErr(passwordErr);
      return false;
    }

    return true;
  };

  const { classes } = props;
  if (redirect) {
    return (
      <>
        <Redirect to={{ pathname: redirect }} />
        {/* once everthing entered successfully, popup snackbar */}
        <Snackbar open={onSuccesful} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="success">
            Successfully Signed up!
          </Alert>
        </Snackbar>
      </>
    );
  } else {
    return (
      <div>
        <Button size="large" variant="contained" color="secondary" onClick={() => setOpen(!open)}>
          SIGN UP
        </Button>
        <Dialog
          fullWidth={true}
          maxWidth="md"
          open={open}
          onClose={() => setOpen(!open)}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title" className={classes.title}>
            <Typography variant="h4">Sign Up</Typography>
          </DialogTitle>
          <DialogContent>
            <form className={classes.form}>
              <DialogContent className={classes.textFieldContainer}>
                <InputLabel color="secondary" required={true} className={classes.inputLabel}>
                  EMAIL ADDRESS
                </InputLabel>
                <TextField
                  autoFocus
                  fullWidth
                  margin="dense"
                  id="email"
                  placeholder="Your Email"
                  type="email"
                  variant="outlined"
                  color="secondary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className={classes.errMsg}>
                  {emailErr.length > 0 ? <Alert severity="error">{emailErr}</Alert> : ''}
                </div>
                <br />
                <InputLabel color="secondary" className={classes.inputLabel}>
                  FIRST NAME
                </InputLabel>
                <TextField
                  fullWidth
                  margin="dense"
                  id="firstName"
                  placeholder="Your first name"
                  type="firstName"
                  variant="outlined"
                  color="secondary"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <div className={classes.errMsg}>
                  {nameErr.length > 0 ? <Alert severity="error">{nameErr}</Alert> : ''}
                </div>
                <br />
                <InputLabel color="secondary" className={classes.inputLabel}>
                  LAST NAME
                </InputLabel>
                <TextField
                  fullWidth
                  margin="dense"
                  id="lastName"
                  placeholder="Your last name"
                  type="lastName"
                  variant="outlined"
                  color="secondary"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <div className={classes.errMsg}>
                  {nameErr.length > 0 ? <Alert severity="error">{nameErr}</Alert> : ''}
                </div>
                <br />
                <InputLabel color="secondary" className={classes.inputLabel}>
                  PASSWORD
                </InputLabel>
                <TextField
                  fullWidth
                  margin="dense"
                  id="password"
                  placeholder="Create a password"
                  type="password"
                  variant="outlined"
                  color="secondary"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className={classes.errMsg}>
                  {passwordErr.length > 0 ? <Alert severity="error">{passwordErr}</Alert> : ''}
                </div>
              </DialogContent>
            </form>
          </DialogContent>
          <DialogActions className={classes.form}>
            <Button variant="contained" color="secondary" size="large" onClick={handleSubmit}>
              Sign Up
            </Button>
            <DialogContentText className={classes.inputLabel}>
              Already a member?{' '}
              <Link href="#" color="secondary">
                Login
              </Link>
            </DialogContentText>
          </DialogActions>
        </Dialog>

        {/* If user entered already exist email */}
        <Snackbar open={existEmailErr} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity="error">
            Entered email is already exist!
          </Alert>
        </Snackbar>
      </div>
    );
  }
}
export default withStyles(useStyles)(SignUp);
