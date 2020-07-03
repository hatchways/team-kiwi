import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles, InputLabel, Link, Typography } from '@material-ui/core';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
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
        marginTop: theme.spacing(3),
        fontWeight: '900',
        fontSize: '12px',
    },

})
function Login(props) {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');

    const onLoginSubmit = () => {
        const isValid = validate();
        if (isValid) {
            // clear form and set the sucessful switch to true
            setEmail('');
            setPassword('');
            setEmailErr('');
            setPasswordErr('');
        }
    }
    const validate = () => {
        let emailErr = "";
        let passwordErr = "";

        if (!email.includes("@")) {
            emailErr = "Invalid email";
        }
        if (password.length < 7) {
            passwordErr = "Password Can not be less than 7 length";
        }

        if (emailErr || passwordErr) {
            setEmailErr(emailErr);
            setPasswordErr(passwordErr);
            return false;
        }

        return true;
    };
    const { classes } = props;
    return (
        <div>
            <Button size="large" variant="outlined" color="secondary" onClick={() => setOpen(!open)} style={{ marginRight: '17px' }}>
                LOGIN
                 </Button>
            <Dialog fullWidth={true} maxWidth='md' open={open} onClose={() => setOpen(!open)} aria-labelledby="form-dialog-title" >
                <DialogTitle id="form-dialog-title" className={classes.title}>
                    <Typography variant="h4">Login</Typography>
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
                                PASSWORD
                                </InputLabel>
                            <TextField

                                fullWidth
                                margin="dense"
                                id="email"
                                placeholder="Your password"
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
                    <Button variant="contained" color="secondary" size="large" onClick={onLoginSubmit} style={{ marginTop: '20px' }}>
                        Login
                        </Button>
                    <DialogContentText className={classes.inputLabel}>
                        Not a member? <Link href="#" color="secondary">Sign Up</Link>
                    </DialogContentText>
                </DialogActions>

            </Dialog>
        </div>
    )

}

export default withStyles(useStyles)(Login);