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
    align: 'center',
    marginTop: theme.spacing(4),
  },
}));

export default function BlankComponent(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.contents}>
        <Typography variant="h6" gutterBottom>
          No bookings right now.
        </Typography>
      </CardContent>
    </Card>
  );
}
