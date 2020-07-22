const express = require('express');
const router = express.Router();
const Payment = require('../models/paymentModel');
const Request = require('../models/requestModel');
const Stripe = require('stripe');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Charge a payment
router.post('/charge', async (req, res) => {
  const { id, amount, user_id, request_id } = req.body;

  try {
    const stripePayment = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'CAD',
      description: request_id,
      payment_method: id,
      confirm: true,
    });

    const payment = new Payment({
      request_id: request_id,
      amount: amount,
    });
    payment.save((err) => {
      if (err) {
        return res.status(400);
      }
    });

    const updateRequest = await Request.findOne({ _id: request_id }, (err, foundRequest) => {
      if (err) {
        res.status(500).send();
      } else {
        if (!foundRequest) {
          res.status(404).send();
        } else {
          foundRequest.paid = true;
          foundRequest.save((err) => {
            if (err) {
              return res.status(400);
            }
          });
        }
      }
    });

    return res.status(200).json({ confirm: 'Done!' });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: err.message });
  }
});

module.exports = router;
