const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Request = require('../models/requestModel');
const User = require('../models/userModel');
const { request } = require('express');
const client = require('socket.io').listen(4000).sockets;
var async = require('async');
const ObjectId = mongoose.Types.ObjectId;

// Connect to Socket.io
client.on('connection', function (socket) {
  sendStatus = function (s) {
    socket.emit('status', s);
  };

  socket.on('getRequest', function (requests) {
    let requestArry = [];

    async.each(
      requests,
      function (request, callback) {
        User.findOne({ _id: request.user_id }, (err, user) => {
          if (user) {
            requestArry.push(user.firstName);
          }
          callback(null);
        });
      },
      function (err) {
        client.emit('requestsFromOwner', requestArry);
      }
    );
  });
});

// Display requests for Sitter
router.get('/getSitterRequest/:id', (req, res) => {
  Request.find({ sitter_id: req.params.id }, (err, request) => {
    if (err) {
      console.log('not found');
      res.status(404).send('Request not found!');
    } else {
      res.status(200).send(request);
    }
  });
});

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

// Display all requests by UserID
router.get('/:id', (req, res) => {
  Request.aggregate(
    [
      { $match: { user_id: ObjectId(req.params.id) } },
      { $sort: { start: 1, end: 1 } },
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
      }
    }
  );
});

// Display accepted requests by UserID
router.get('/accepted/:id', (req, res) => {
  Request.aggregate(
    [
      { $match: { user_id: ObjectId(req.params.id), accepted: true } },
      { $sort: { start: 1, end: 1 } },
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
      }
    }
  );
});

//Display a specific request by requestID
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
router.put('/:id', async (req, res) => {
  await Request.findOne({ _id: req.params.id }, (err, foundRequest) => {
    if (err) {
      res.status(500).send();
    } else {
      if (!foundRequest) {
        res.status(404).send();
      } else {
        const { start, end, cost } = req.body;
        foundRequest.start = start;
        foundRequest.end = end;
        foundRequest.cost = cost;
        foundRequest.save(function (err, savedRequest) {
          if (err) {
          } else {
            res.status(200).send(savedRequest);
          }
        });
      }
    }
  });
});

module.exports = router;
