const express = require('express');
const router = express.Router();
const Profile = require('../models/profileModel');
const User = require('../models/userModel');
const profileInputValidator = require('../validator');

// POST a new profile
router.post('/add', (req, res) => {
  if (err) {
    res.status(400).json(errMsg);
  } else {
    const profile = new Profile(newProfile);

    profile.save((err) => {
      if (err) {
        res.status(400);
      } else {
        res.status(200).send('Profile created!');
      }
    });
  }
});

// GET all the profiles
router.get('/', (req, res) => {
  Profile.find({}, (err, foundProfile) => {
    if (err) {
      res.status(404).send('No profiles were found!');
    } else {
      res.status(200).send(foundProfile);
    }
  });
});

// GET a profile by id
router.get('/:id', (req, res) => {
  Profile.findOne({ _id: req.params.id }, (err, foundProfile) => {
    if (err) {
      res.status(404).send('Profile not found!');
    } else {
      res.status(200).send(foundProfile);
    }
  });
});

// GET a profile by userId
router.get('/ref/:id', (req, res) => {
  Profile.findOne({ userID: req.params.id }, (err, foundProfile) => {
    if (err) {
      res.status(404).send('Profile not found!');
    } else {
      res.status(200).send(foundProfile);
    }
  });
});

// PUT a specific profile
router.put('/:id', (req, res) => {
  Profile.findOne({ userID: req.params.id }, (err, foundProfile) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (!foundProfile) {
        res.status(404).send();
      } else {
        // update the profile database.
        const {
          firstName,
          lastName,
          // email,
          gender,
          birthDate,
          phoneNumber,
          address,
          description,
        } = req.body;
        foundProfile.firstName = firstName;
        foundProfile.lastName = lastName;
        // foundProfile.email = email;
        foundProfile.gender = gender;
        foundProfile.birthDate = birthDate;
        foundProfile.phoneNumber = phoneNumber;
        foundProfile.address = address;
        foundProfile.description = description;
        // foundProfile.available = false;

        foundProfile.save(function (err, savedProfile) {
          if (err) {
            console.log(err);
          } else {
            // update the user database as well if any related updates available
            User.findOne({ _id: req.params.id }, (err, user) => {
              // (user.userEmail = email),
              user.firstName = firstName;
              user.lastName = lastName;

              user.save(function (err) {
                if (err) {
                  console.log(err);
                }
              });
            });

            res.json(savedProfile);
          }
        });
      }
    }
  });
});
module.exports = router;
