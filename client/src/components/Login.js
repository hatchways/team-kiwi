import React, { Component, Fragment } from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
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
        marginTop: theme.spacing(3),
        fontWeight: '900',
        fontSize: '12px',
    },

})
class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false
        }
        this.handleClickOpen = this.handleClickOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }
    handleClickOpen = () => {
        this.setState(state => ({
            open: !state.open
        }));
    };
    handleClose = () => {
        this.setState(state => ({
            open: !state.open
        }));
    };
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button size="large" variant="outlined" color="secondary" onClick={this.handleClickOpen} style={{ marginRight: '17px' }}>
                    LOGIN
                 </Button>
                <Dialog fullWidth={true} maxWidth='md' open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title" >
                    <DialogTitle id="form-dialog-title" className={classes.title}>
                        <Typography variant="h4">Login</Typography>
                    </DialogTitle>
                    <DialogContent>
                        {/* <DialogContentText>
                            To subscribe to this website, please enter your email address here. We will send updates
                            occasionally.
                      </DialogContentText> */}
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
                                />
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
                                />
                            </DialogContent >
                        </form>
                    </DialogContent>
                    <DialogActions className={classes.form}>
                        <Button variant="contained" color="secondary" size="large" onClick={this.handleClose} style={{ marginTop: '20px' }}>
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
}

export default withStyles(useStyles)(Login);