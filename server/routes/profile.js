const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuid } = require('uuid');

const router = express.Router();
const Profile = require('../models/profileModel');
const User = require('../models/userModel');
const profileInputValidator = require('../validator');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
});

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, '');
  },
});
const upload = multer({ storage }).single('image');

// Add profile photo
router.post('/uploadPhoto/:id', upload, (req, res) => {
  let uploadedImg = req.file.originalname.split('.');
  let fileType = uploadedImg[uploadedImg.length - 1];

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${uuid()}.${fileType}`,
    Body: req.file.buffer,
    ACL: 'public-read',
  };

  s3.upload(params, (error, data) => {
    if (error) {
      console.log(error);
      res.status(400).send(error);
    } else {
      // Adding the Image url stored in S3 into the database
      Profile.findOne({ user: req.params.id }, (err, foundProfile) => {
        foundProfile.profileImg = data.key;

        foundProfile.save(function (err) {
          if (err) {
            console.log(err);
          }
        });
      });
      res.status(200).send(data);
    }
  });
});
// Get Profile Image

// Add a new profile
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
