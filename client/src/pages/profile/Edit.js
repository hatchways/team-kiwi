import React, { Fragment } from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

function Edit() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        // margin: theme.spacing(1),
        width: theme.spacing(100),
        height: theme.spacing(110),
      },
    },
    grid: {
      flexGrow: 1,
      padding: theme.spacing(5),
    },
    label: {
      padding: theme.spacing(2),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  }));
  const classes = useStyles();

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
                  placeholder="John"
                  fullWidth
                  margin="normal"
                  variant="outlined"
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
                  placeholder="Doe"
                  fullWidth
                  margin="normal"
                  variant="outlined"
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
                <FormControl
                  variant="outlined"
                  className={classes.formControl}
                  fullWidth
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Age
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    // value={age}
                    label="Age"
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
                  placeholder=""
                  fullWidth
                  margin="normal"
                  variant="outlined"
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
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default Edit;
