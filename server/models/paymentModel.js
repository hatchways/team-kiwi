const mongoose = require('mongoose');

const PaymentSchema = {
  username: { type: String, unique: true, trim: true },
  amount: { type: Number },
  closed: { type: Boolean },
  created_date: { type: Date, default: Date.now },
};

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
