const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Request = require('../models/requestModel');
const ObjectId = mongoose.Types.ObjectId;

// Add a new request
router.post('/add', (req, res) => {
  const request = new Request(req.body);
  request.save((err) => {
    if (err) {
      return res.status(400);
    } else {
      return res.status(200).send('Request created!');
    }
  });
});

// Display all requests
router.get('/', (req, res) => {
  Request.find({}, (err, request) => {
    if (err) {
      res.status(404).send('No requests were found!');
    } else {
      res.status(200).send(request);
    }
  });
});

// Display all requests by UserID
router.get('/:id', (req, res) => {
  Request.aggregate(
    [
      { $match: { user_id: ObjectId(req.params.id) } },
      {
        $lookup: {
          from: 'profiles',
          localField: 'sitter_id',
          foreignField: '_id',
          as: 'sitterProfile',
        },
      },
    ],
    (err, request) => {
      if (err) {
        res.status(404).send('Requests not found!');
      } else {
        res.status(200).send(request);
        // res.json(request);
      }
    }
  );
});

// Display a specific request by requestID
router.get('/ref/:id', (req, res) => {
  Request.findOne({ _id: req.params.id }, (err, request) => {
    if (err) {
      res.status(404).send('Request not found!');
    } else {
      res.status(200).send(request);
    }
  });
});

// Update a specific request
router.put('/:id', (req, res) => {});

module.exports = router;
