const express = require('express');
const router = express.Router();
const Profile = require('../models/profileModel');
const User = require('../models/userModel');
const profileInputValidator = require('../validator');

// Add a new profile
router.post('/add', (req, res) => {
  //const { err, errMsg, profile: newProfile } = profileInputValidator(req.body);

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

// Display all the profiles
router.get('/profile', (req, res) => {
  Profile.find({}, (err, foundProfile) => {
    if (err) {
      res.status(404).send('No profiles were found!');
    } else {
      res.status(200).send(foundProfile);
    }
  });
});

// Display a specific profile
router.get('/profile/:id', (req, res) => {
  Profile.findOne({ user: req.params.id }, (err, foundProfile) => {
    if (err) {
      console.log(err);
      res.status(404).send('Profile not found!');
    } else {
      res.status(200).send(foundProfile);
    }
  });
});

// Update a specific profile
router.put('/profile/:id', (req, res) => {
  Profile.findOne({ user: req.params.id }, (err, foundProfile) => {
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
          email,
          gender,
          birth,
          phoneNumber,
          address,
          description,
        } = req.body;
        foundProfile.firstName = firstName;
        foundProfile.lastName = lastName;
        foundProfile.email = email;
        foundProfile.gender = gender;
        foundProfile.birthDate = birth;
        foundProfile.phone = phoneNumber;
        foundProfile.address = address;
        foundProfile.description = description;
        foundProfile.available = true;

        foundProfile.save(function (err, savedProfile) {
          if (err) {
            console.log(err);
          } else {
            // update the user database as well if any related updates available
            User.findOne({ _id: req.params.id }, (err, user) => {
              (user.userEmail = email), (user.firstName = firstName), (user.lastName = lastName);

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
