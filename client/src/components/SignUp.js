import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles, InputLabel, Link, Typography } from '@material-ui/core';

const useStyles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        // width: 'fit-content',
        width: '50vw'
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

    }

})
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function SignUp(props) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [nameErr, setNameErr] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [onSuccesful, setOnSuccesful] = useState('');

    const handleSubmit = () => {
        const isValid = validate();
        if (isValid) {
            // clear form and set the sucessful switch to true
            setEmail('');
            setName('');
            setPassword('');
            setNameErr('');
            setEmailErr('');
            setPasswordErr('');
            setOnSuccesful(true);
        }
    }
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const validate = () => {
        let nameErr = "";
        let emailErr = "";
        let passwordErr = "";


        if (!name) {
            nameErr = "Name cannot be blank";
        }

        if (!email.includes("@")) {
            emailErr = "Invalid email";
        }
        if (password.length < 7) {
            passwordErr = "Password Can not be less than 7 length";
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

    return (
        <div>
            <Button size="large" variant="contained" color="secondary" onClick={() => setOpen(!open)}>
                SIGN UP
                 </Button>
            <Dialog fullWidth={true} maxWidth='md' open={open} onClose={() => setOpen(!open)} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title" className={classes.title}>
                    <Typography variant="h4">Sign Up</Typography>
                </DialogTitle>
                <DialogContent>

                    <form className={classes.form}>
                        <DialogContent className={classes.textFieldContainer}>
                            <InputLabel
                                color="secondary"
                                required={true}
                                className={classes.inputLabel}
                            >
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
                                onChange={e => setEmail(e.target.value)}
                            />
                            <div className={classes.errMsg}>
                                {
                                    emailErr.length > 0 ? <Alert severity="error">{emailErr}</Alert> : ''
                                }
                            </div>
                            <br />
                            <InputLabel
                                color="secondary"
                                className={classes.inputLabel}
                            >
                                NAME
                                </InputLabel>
                            <TextField
                                fullWidth
                                margin="dense"
                                id="name"
                                placeholder="Your name"
                                type="name"
                                variant="outlined"
                                color="secondary"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                            <div className={classes.errMsg}>
                                {
                                    nameErr.length > 0 ? <Alert severity="error">{nameErr}</Alert> : ''
                                }
                            </div>
                            <br />
                            <InputLabel
                                color="secondary"
                                className={classes.inputLabel}
                            >
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
                                onChange={e => setPassword(e.target.value)}
                            />
                            <div className={classes.errMsg}>
                                {
                                    passwordErr.length > 0 ? <Alert severity="error">{passwordErr}</Alert> : ''
                                }
                            </div>
                        </DialogContent >
                    </form>
                </DialogContent>
                <DialogActions className={classes.form}>
                    <Button variant="contained" color="secondary" size="large" onClick={handleSubmit}>
                        Sign Up
                        </Button>
                    <DialogContentText className={classes.inputLabel}>
                        Already a member? <Link href="#" color="secondary">Login</Link>
                    </DialogContentText>
                </DialogActions>
            </Dialog>

            {/* once everthing entered successfully, popup snackbar */}
            <Snackbar open={onSuccesful} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Successfully Signed up!
                    </Alert>
            </Snackbar>
        </div>
    )
}


export default withStyles(useStyles)(SignUp);