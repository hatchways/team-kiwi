const express = require('express');
const router = express.Router();
const Request = require('../models/requestModel');
const User = require('../models/userModel');
const { request } = require('express');
const client = require('socket.io').listen(4000).sockets;
var async = require('async');

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
