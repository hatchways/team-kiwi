const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Request = require('../models/requestModel');
const ObjectId = mongoose.Types.ObjectId;

// Display all requests by SitterID
router.get('/:id', (req, res) => {
  Request.aggregate(
    [
      { $match: { sitter_id: ObjectId(req.params.id) } },
      { $sort: { start: 1, end: 1 } },
      {
        $lookup: {
          from: 'profiles',
          localField: 'user_id',
          foreignField: 'userID',
          as: 'ownerProfile',
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

// Update a specific request
router.put('/:id', async (req, res) => {
  await Request.findOne({ _id: req.params.id }, (err, foundRequest) => {
    if (err) {
      console.log(err);
      res.status(500).send();
    } else {
      if (!foundRequest) {
        res.status(404).send();
      } else {
        const { accepted, declined } = req.body;
        foundRequest.accepted = accepted;
        foundRequest.declined = declined;
        foundRequest.save(function (err, savedRequest) {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send(savedRequest);
          }
        });
      }
    }
  });
});

module.exports = router;
