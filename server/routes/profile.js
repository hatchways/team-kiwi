const express = require('express')
const router = express.Router()
const Profile = require('../models/profileModel')

// Add a new profile
router.post('/profile', (req, res) => {
    const profile = new Profile({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        birthDate: req.body.birthDate,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        description: req.body.description,
        availability: req.body.availability
    })

    Profile.save((err) => {
        if(err){
            console.error(err);
        }
    })
});

// Display all the profiles
router.get('/profile', (req, res) => {
    Profile.find({}, (err, foundProfile) => {
        if(err){
            console.error(err)
        }
        else {
            res.send(foundProfile)
        }
    })
});

// Display a specific profile
router.get('/profile/:id', (req, res) => {
    Profile.findOne({_id: req.params.id}, (err, foundProfile) => {
        if(err){
            console.error(err)
        }
        else {
            res.send(foundProfile)
        }
    })
});

// Update a specific profile
router.put('/profile/:id', (req, res) => {
    updatedProfile = {
        firstName = req.body.firstName,
        lastName = req.body.lastName,
        gender: req.body.gender,
        birthDate: req.body.birthDate,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        description: req.body.description,
        availability: req.body.availability
    }

    Profile.updateOne({_id: req.body.id}, updatedProfile,(err) => {
        if(err){
            console.error(err)
        }
        else {
            console.log("Successfully updated a document.")
        }
    } )
});