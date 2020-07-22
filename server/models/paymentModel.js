const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const paymentSchema = {
  request_id: { type: Schema.Types.ObjectId },
  amount: { type: Number },
  created_date: { type: Date, default: Date.now },
};

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;
