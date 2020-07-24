const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Conversation = require('../models/conversationModel');
const Message = require('../models/messageModel');
const { request } = require('express');
const ObjectId = mongoose.Types.ObjectId;

router.post('/conversation/add', (req, res) => {
  const conversation = new Conversation(req.body);
  conversation.save((err) => {
    if (err) {
      return res.status(400);
    } else {
      return res.status(200).send('Conversation created!');
    }
  });
});

router.post('/add', (req, res) => {
  const message = new Message(req.body);
  message.save((err) => {
    if (err) {
      return res.status(400);
    } else {
      return res.status(200).send('Message created!');
    }
  });
});

router.post('/', (req, res) => {
  Conversation.findOne(
    { participants: { $all: [req.body.partner, req.body.me] } },
    (err, conversation) => {
      if (err) {
        res.status(404).send('No conversation were found!');
      } else {
        // res.status(200).send(conversation);
        if (conversation === null) {
          Message.find({ conversation_id: conversation.id }, (err, messages) => {
            if (err) {
              res.status(404).send('No messages were found!');
            } else {
              res.status(200).send(messages);
            }
          });
        } else res.status(404).send('No messages were found!');
      }
    }
  );
});

// Message.find({ conversation_id: req.params.id }, (err, messages) => {
//   if (err) {
//     res.status(404).send('No profiles were found!');
//   } else {
//     res.status(200).send(messages);
//   }
// });

module.exports = router;
