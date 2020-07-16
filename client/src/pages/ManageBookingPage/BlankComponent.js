import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 360,
    height: 125,
    marginTop: theme.spacing(1),
  },
  contents: {
    padding: theme.spacing(0.5),
  },
  name: {
    float: 'left',
    marginLeft: theme.spacing(1),
    padding: theme.spacing(1.5),
  },
}));

export default function BookingComponent(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.contents}>
        <Typography variant="h6" className={classes.name} gutterBottom>
          No bookings..
        </Typography>
      </CardContent>
    </Card>
  );
}
