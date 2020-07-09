import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SearchIcon from '@material-ui/icons/Search';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  search: {
    padding: theme.spacing(4, 0, 4),
  },
  searchButtons: {
    marginTop: theme.spacing(0),
  },
  searchContent: {
    // padding: theme.spacing(5, 0, 6),
  },
  cardGrid: {
    // paddingTop: theme.spacing(4),
    // paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    width: 80,
    height: 80,
    marginTop: theme.spacing(2),
    margin: 'auto',
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

function Home() {
  const classes = useStyles();
  const [sitters, setSitters] = useState();

  useEffect(() => {
    axios.get('/profile').then(({ data }) => {
      setSitters(data);
    });
  }, []);

  return sitters ? (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.search}>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h1" align="center" gutterBottom>
            Your search results
          </Typography>
          <div className={classes.searchButtons}>
            <Grid container spacing={1} justify="center" alignItems="flex-end">
              <Grid item>
                <SearchIcon />
              </Grid>
              <Grid item>
                <TextField id="input-with-icon-grid" label="Location" />
              </Grid>
              <Grid item>
                <DateRangeIcon />
              </Grid>
              <Grid item>
                <TextField id="input-with-icon-grid" label="Date" />
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <div className={classes.searchContent}>
        {sitters.length > 0 ? (
          <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
              {sitters.map((sitter) => (
                <Grid item key={sitter.id} xs={12} sm={6} md={4}>
                  <Card className={classes.card} elevation={3}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/images/profile_1.jpg"
                      className={classes.avatar}
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography variant="h5" component="h2" align="center" gutterBottom>
                        {sitter.firstName} {sitter.lastName}
                      </Typography>
                      <Typography align="center">{sitter.description}</Typography>
                    </CardContent>
                    <Divider light />
                    <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                      <Button size="small" color="primary">
                        Request
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        ) : (
          <div>No sitters matched</div>
        )}
      </div>
      <footer className={classes.footer}>
        {sitters.length > 0 && (
          <Button size="large" variant="outlined">
            Show more
          </Button>
        )}
      </footer>
    </React.Fragment>
  ) : (
    <Typography component="h1" variant="h1" align="center" className={classes.search} gutterBottom>
      Loading...
    </Typography>
  );
}

export default Home;
