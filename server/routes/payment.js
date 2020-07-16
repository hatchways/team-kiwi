const express = require('express');
const router = express.Router();
const Payment = require('../models/paymentModel');
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Add a new payment
router.post('/add', (req, res) => {
  const payment = new Payment(req.body);
  payment.save((err, payment) => {
    if (err) res.send(err);
    res.json(payment);
  });
});

// Charge a payment
router.post('/charge', async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: 'CAD',
      description: 'Test payment',
      payment_method: id,
      confirm: true,
    });
    return res.status(200).json({ confirm: 'Done!' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
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
