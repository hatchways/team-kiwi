import React, { Fragment } from "react";

import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Box } from "@material-ui/core";
import CardComponent from "./CardComponent";

function Payment() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        // margin: theme.spacing(1),
        width: theme.spacing(100),
        height: theme.spacing(80),
      },
    },
    box: {
      // display: "flex",
      // flexDirection: "column",
      // alignItems: "center",
      padding: theme.spacing(5),
    },
    innerbox: {
      display: "flex",
      // flexDirection: "column",
      alignItems: "left",
      padding: theme.spacing(4),
    },
    uploadBtn: {
      margin: theme.spacing(5),
      padding: theme.spacing(2),
      marginRight: theme.spacing(1),
    },
    deleteBtn: {
      color: theme.palette.text.secondary,
    },
    paper: {
      // padding: theme.spacing(2),
      // color: theme.palette.text.secondary,
      // marginTop: theme.spacing(8),
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
              Payment Methods
            </Typography>
          </Box>
          <Box className={classes.innerbox}>
            <Grid container spacing={3} className={classes.grid}>
              <Grid container item xs={12}>
                <Typography variant="h6" color="textSecondary">
                  Saved Payment Profiles:
                </Typography>
              </Grid>

              <CardComponent brand="master" />
              <CardComponent brand="visa" />
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
}

export default Payment;
