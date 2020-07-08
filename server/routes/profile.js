const router = require('express').Router();
const Profile = require('../models/profileModel');
const profileInputValidator = require('../validator');

// Add a new profile
router.post('/add', (req, res) => {
  const { err, errMsg, profile: newProfile } = profileInputValidator(req.body);

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
router.get('/', (req, res) => {
  Profile.find({}, (err, foundProfile) => {
    if (err) {
      res.status(404).send('No profiles were found!');
    } else {
      res.status(200).send(foundProfile);
    }
  });
});

// Display a specific profile
router.get('/:id', (req, res) => {
  Profile.findOne({ _id: req.params.id }, (err, foundProfile) => {
    if (err) {
      res.status(404).send('Profile not found!');
    } else {
      res.status(200).send(foundProfile);
    }
  });
});

// Update a specific profile
router.put('/:id', (req, res) => {
  const { err, errMsg, newProfile } = profileInputValidator(req.body);

  if (err) {
    res.status(400).json(errMsg);
  } else {
    Profile.updateOne({ _id: req.body.id }, newProfile, (err) => {
      if (err) {
        res.status(404).send("Profile doesn't exist!");
      } else {
        res.status(200).send('Successfully updated a document.');
      }
    });
  }
});

module.exports = router;
