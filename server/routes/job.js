const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Request = require('../models/requestModel');
const ObjectId = mongoose.Types.ObjectId;

// // Add a new request
// router.post('/add', (req, res) => {
//   const request = new Request(req.body);
//   request.save((err) => {
//     if (err) {
//       return res.status(400);
//     } else {
//       return res.status(200).send('Request created!');
//     }
//   });
// });

// Display all requests
// router.get('/', (req, res) => {
//   Request.find({}, (err, request) => {
//     if (err) {
//       res.status(404).send('No requests were found!');
//     } else {
//       res.status(200).send(request);
//     }
//   });
// });

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

// Display a specific request by requestID
// router.get('/ref/:id', (req, res) => {
//   Request.findOne({ _id: req.params.id }, (err, request) => {
//     if (err) {
//       res.status(404).send('Request not found!');
//     } else {
//       res.status(200).send(request);
//     }
//   });
// });

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
