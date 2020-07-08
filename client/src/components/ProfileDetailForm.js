import React from 'react';
import {
  makeStyles,
  Paper,
  Box,
  Avatar,
  Typography,
  Grid,
  Card,
  GridList,
  GridListTile,
  TextField,
  Button,
} from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import Rating from '@material-ui/lab/Rating';

function ProfileDetailForm() {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexWrap: 'wrap',
      width: theme.spacing(100),
    },
    topBackground: {
      minHeight: 'calc(50vh - 66px)',
      background: 'url(/images/detail_background.jpg) center/cover no-repeat',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    about: {
      margin: theme.spacing(5),
    },
    requestForm: {
      flexWrap: 'wrap',
      width: 345,
      height: 400,
      marginLeft: theme.spacing(10),
    },
    subPhotos: {
      margin: theme.spacing(5),
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
    },
    datePicker: {
      marginRight: theme.spacing(1),
      width: 200,
      float: 'left',
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    photo: {
      margin: theme.spacing(5),
      width: theme.spacing(20),
      height: theme.spacing(20),
    },
  }));
  const classes = useStyles();
  const dogPics = [
    {
      img: '/images/dog_1.jpg',
      title: 'Dog_1',
    },
    {
      img: '/images/dog_2.jpg',
      title: 'Dog_2',
    },
  ];

  return (
    <>
      <Grid container spacing={0} align="center" justify="center" style={{ marginTop: '5%' }}>
        <Grid maxWidth="md" className={classes.root}>
          <Paper elevation={5}>
            {/* Profile background section */}
            <Box className={classes.topBackground} />

            <Grid style={{ marginTop: '-120px' }}>
              <Avatar alt="Remy Sharp" src="/images/profile_1.jpg" className={classes.photo} />
              <Typography variant="h1" align="center">
                Thanos
              </Typography>
              <Typography variant="h6" align="center" style={{ color: 'grey' }} gutterBottom>
                Loving pet sitter
              </Typography>
              <Grid
                container
                spacing={0}
                align="center"
                justify="center"
                style={{ marginTop: '15px' }}
              >
                <RoomIcon style={{ color: '#f44336' }} />
                <Typography variant="subtitle1" style={{ color: 'grey', marginLeft: '7px' }}>
                  Toronto, Ontario
                </Typography>
              </Grid>
            </Grid>
            {/* About section */}
            <Grid className={classes.about}>
              <Typography variant="h1" align="left" gutterBottom>
                About me
              </Typography>
              <Typography variant="body1" align="left" gutterBottom>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with
                the release of Letraset sheets containing Lorem Ipsum passages, and more recently
                with desktop publishing software like Aldus PageMaker including versions of Lorem
                Ipsum.
              </Typography>
            </Grid>

            {/* sub photos */}
            <Grid className={classes.subPhotos}>
              <GridList className={classes.gridList} cols={4} spacing={10}>
                {dogPics.map((pic) => (
                  <GridListTile key={pic.img} style={{ marginBottom: '25px' }}>
                    <img src={pic.img} alt={pic.title} />
                  </GridListTile>
                ))}
              </GridList>
            </Grid>
          </Paper>
        </Grid>

        {/* REQUEST FORM SECTION */}
        <Card className={classes.requestForm} elevation={5}>
          <Grid>
            <Typography variant="h1" align="center" gutterBottom style={{ marginTop: '35px' }}>
              $14/hr
            </Typography>
            <Rating name="half-rating-read" defaultValue={3.5} precision={0.5} readOnly />
          </Grid>
          <Grid style={{ margin: '35px' }}>
            <Typography variant="subtitle1" align="left" gutterBottom style={{ fontWeight: '800' }}>
              DROP IN
            </Typography>
            <TextField
              id="datetime-local"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              className={classes.datePicker}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid style={{ margin: '35px', marginTop: '65px' }}>
            <Typography variant="subtitle1" align="left" gutterBottom style={{ fontWeight: '800' }}>
              DROP OFF
            </Typography>
            <TextField
              id="datetime-local"
              type="datetime-local"
              defaultValue="2017-05-24T10:30"
              className={classes.datePicker}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Button variant="contained" size="large" color="primary" style={{ marginTop: '45px' }}>
            SEND REQUEST
          </Button>
        </Card>
      </Grid>
    </>
  );
}

export default ProfileDetailForm;
