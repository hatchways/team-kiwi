const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = {
  request_id: { type: Schema.Types.ObjectId, required: true },
  amount: { type: Number },
  closed: { type: Boolean, default: false },
  created_date: { type: Date, default: Date.now },
};

const Payment = mongoose.model('Payment', PaymentSchema);

module.exports = Payment;
