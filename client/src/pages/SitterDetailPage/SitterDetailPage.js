import React, { useState, useEffect } from 'react';
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
  Snackbar,
} from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import moment from 'moment';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={7} variant="filled" {...props} />;
}

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
    transform: 'translateZ(0)',
  },
  photo: {
    margin: theme.spacing(5),
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  confirmForm: {
    // flexWrap: 'wrap',
    alignItems: 'center',
    width: 400,
    height: 500,
  },
}));

function SitterDetailPage(props) {
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

  const defaultTime = moment('1200', 'HH:mm').add(1, 'day');
  const classes = useStyles();
  const [sitter, setSitter] = useState();
  const [start, setStart] = useState(defaultTime.format('YYYY-MM-DDTHH:mm'));
  const [end, setEnd] = useState(defaultTime.add(1, 'day').format('YYYY-MM-DDTHH:mm'));
  const [modalOpen, setModalOpen] = useState(false);
  const [reqSuccess, setSuccess] = useState(false);
  const [reqError, setError] = useState(false);
  const [sittingCost, setSittingCost] = useState(0);
  const cost = 14;

  const handleModalOpen = () => {
    if (start < end) {
      const rawCost = moment.duration(moment(end).diff(moment(start))).asHours() * cost;
      setSittingCost(rawCost.toFixed(2));
      setModalOpen(true);
    } else setError(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleMessageClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccess(false);
    setError(false);
  };

  const confirmRequest = () => {
    const request = {
      user_id: props.location.userID,
      sitter_id: props.location.sitterID,
      start: start,
      end: end,
      cost: sittingCost,
    };

    axios
      .post('/request/add', request)
      .then((response) => {
        if (!response.data.error) {
          console.log('success');
          handleModalClose();
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  };

  useEffect(() => {
    axios.get(`/profile/${props.location.sitterID}`).then(({ data }) => {
      setSitter(data);
    });
  }, [props.location.sitterID]);

  return sitter ? (
    <Grid container spacing={0} align="center" justify="center" style={{ marginTop: '5%' }}>
      <Grid maxwidth="md" className={classes.root}>
        <Paper elevation={5}>
          {/* Profile background section */}
          <Box className={classes.topBackground} />

          <Grid style={{ marginTop: '-120px' }}>
            <Avatar alt="Remy Sharp" src="/images/profile_3.jpg" className={classes.photo} />
            <Typography variant="h1" align="center">
              {sitter.firstName} {sitter.lastName}
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
                {/* {props.userInfo.address} */}
              </Typography>
            </Grid>
          </Grid>
          {/* About section */}
          <Grid className={classes.about}>
            <Typography variant="h1" align="left" gutterBottom>
              About me
            </Typography>
            <Typography variant="body1" align="left" gutterBottom>
              {/* {props.userInfo.description} */}
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
            ${cost}/hr
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
            defaultValue={start}
            className={classes.datePicker}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setStart(e.target.value)}
          />
        </Grid>
        <Grid style={{ margin: '35px', marginTop: '65px' }}>
          <Typography variant="subtitle1" align="left" gutterBottom style={{ fontWeight: '800' }}>
            DROP OFF
          </Typography>
          <TextField
            id="datetime-local"
            type="datetime-local"
            defaultValue={end}
            className={classes.datePicker}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setEnd(e.target.value)}
          />
        </Grid>
        <Button
          variant="contained"
          size="large"
          color="primary"
          style={{ marginTop: '45px' }}
          onClick={handleModalOpen}
        >
          SEND REQUEST
        </Button>

        {/* Confirm FORM SECTION */}
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={modalOpen}
          onClose={handleModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div style={{ outline: 0 }}>
            <Fade in={modalOpen}>
              <Card className={classes.requestForm} elevation={5} align="center">
                <Grid>
                  <Typography
                    variant="h1"
                    align="center"
                    gutterBottom
                    style={{ marginTop: '35px' }}
                  >
                    Confirm Request
                  </Typography>
                  <Typography
                    variant="h2"
                    align="center"
                    gutterBottom
                    style={{ marginTop: '20px' }}
                  >
                    Total Cost : ${sittingCost}
                  </Typography>
                </Grid>
                <Grid style={{ margin: '35px' }}>
                  <Typography
                    variant="subtitle1"
                    align="left"
                    gutterBottom
                    style={{ fontWeight: '800' }}
                  >
                    DROP IN
                  </Typography>
                  <TextField
                    disabled
                    id="datetime-local"
                    type="datetime-local"
                    defaultValue={start}
                    className={classes.datePicker}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid style={{ margin: '35px', marginTop: '65px' }}>
                  <Typography
                    variant="subtitle1"
                    align="left"
                    gutterBottom
                    style={{ fontWeight: '800' }}
                  >
                    DROP OFF
                  </Typography>
                  <TextField
                    disabled
                    id="datetime-local"
                    type="datetime-local"
                    defaultValue={end}
                    className={classes.datePicker}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Button
                  variant="contained"
                  size="large"
                  color="primary"
                  style={{ marginTop: '45px' }}
                  onClick={confirmRequest}
                >
                  CONFIRM REQUEST
                </Button>
              </Card>
            </Fade>
          </div>
        </Modal>
        <Snackbar open={reqSuccess} autoHideDuration={1500} onClose={handleMessageClose}>
          <Alert onClose={handleMessageClose} severity="success">
            Requested successfully!
          </Alert>
        </Snackbar>
        <Snackbar open={reqError} autoHideDuration={2000} onClose={handleMessageClose}>
          <Alert onClose={handleMessageClose} severity="error">
            Please check request dates and time.
          </Alert>
        </Snackbar>
      </Card>
    </Grid>
  ) : (
    <Typography component="h1" variant="h1" align="center" className={classes.search} gutterBottom>
      Loading...
    </Typography>
  );
}

export default SitterDetailPage;