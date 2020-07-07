const express = require('express');
const router = express.Router();
const Payment = require('../models/paymentModel');

// Add a new payment
router.post('/', (req, res) => {
  const payment = new Payment(req.body);
  payment.save((err, payment) => {
    if (err) res.send(err);
    res.json(payment);
  });
});

// Display all payments
router.get('/', (req, res, next) => {
  Payment.find({}, (err, payment) => {
    if (err) res.send(err);
    res.json(payment);
  });
});

// Display a specific payment
router.get('/:id', (req, res) => {
  Payment.findOne({ _id: req.params.id }, (err, payment) => {
    if (err) res.send(err);
    res.json(payment);
  });
});

module.exports = router;
