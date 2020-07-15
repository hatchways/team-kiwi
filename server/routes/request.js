const express = require('express');
const router = express.Router();
const Request = require('../models/requestModel');

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

// Display a specific request
router.get('/:id', (req, res) => {
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
