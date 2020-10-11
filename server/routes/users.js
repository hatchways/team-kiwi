const router = require('express').Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
let User = require('../models/userModel');
let Profile = require('../models/profileModel');
const jwt = require('jsonwebtoken');
const passport = require('../passport');
require('dotenv').config();

router.get('/', (req, res, next) => {
  if (req.user) {
    User.findOne({ _id: req.user._id }, (err, user) => {
      var userInfo = {
        id: user._id,
        userEmail: user.userEmail,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      res.json({ user: userInfo });
    });
  } else {
    res.json({ user: null });
  }
});

//Get all users and profile except user for messaging
router.get('/all/:id', (req, res) => {
  User.aggregate(
    [
      { $match: { _id: { $ne: ObjectId(req.params.id) } } },
      {
        $lookup: {
          from: 'profiles',
          localField: '_id',
          foreignField: 'userID',
          as: 'userProfile',
        },
      },
    ],
    (err, users) => {
      if (err) {
        res.status(404).send('No profiles were found!');
      } else {
        res.status(200).send(users);
      }
    }
  );
});

router.route('/add').post((req, res) => {
  const { firstName, lastName, userEmail, password } = req.body;

  // ADD VALIDATION
  User.findOne({ userEmail: userEmail }, (err, user) => {
    if (err) {
      res.json({
        error: err,
      });
    } else if (user) {
      res.json({
        error: `Sorry, ${userEmail} is already exist email address`,
      });
    } else {
      const newUser = new User({
        firstName: firstName,
        lastName: lastName,
        userEmail: userEmail,
        password: password,
      });

      newUser.save(function (err, savedUser) {
        if (err) {
          console.log(err);
        } else {
          const profile = new Profile({
            userID: newUser._id,
            firstName: firstName,
            lastName: lastName,
            email: userEmail,
          });
          profile.save(function (err) {
            if (err) {
              console.log(err);
            }
          });
          res.json(savedUser);
        }
      });
    }
  });
});

router.post('/protected', authenticateToken, (req, res) => {
  res.json(req.userInfo);
});

router.post(
  '/login',
  function (req, res, next) {
    next();
  },
  passport.authenticate('local'),
  (req, res) => {
    var userInfo = {
      userEmail: req.user.userEmail,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
    };

    //////////////////// jwt start //////////////
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_LOGIN);
    res.json({ accessToken: accessToken });
  }
);

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_LOGIN, (err, userInfo) => {
    if (err) return res.sendStatus(403);
    req.userInfo = userInfo;
    next();
  });
}

router.post('/logout', (req, res) => {
  if (req.user) {
    req.logOut();
    res.send({ msg: 'logging out' });
  } else {
    res.send({ msg: 'no user to log out' });
  }
});

module.exports = router;
