const express = require('express');
const router = express.Router();
const Payment = require('../models/paymentModel');
const Request = require('../models/requestModel');
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Charge a payment
router.post('/charge', async (req, res) => {
  const { id, amount } = req.body;

  try {
    const stripePayment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'CAD',
      description: 'Test payment',
      payment_method: id,
      confirm: true,
    });

    const updateRequest = await Request.findOne(
      { _id: req.body.request_id },
      (err, foundRequest) => {
        if (err) {
          res.status(500).send();
        } else {
          if (!foundRequest) {
            res.status(404).send();
          } else {
            foundRequest.paid = true;
            foundRequest.save((err) => {
              if (err) return res.status(400).json({ message: err.message });
            });
          }
        }
      }
    );

    const payment = new Payment(req.body);
    payment.save((err) => {
      if (err) return res.status(400).json({ message: err.message });
    });

    return res.status(200).json({ confirm: 'Done!' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
