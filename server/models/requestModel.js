const mongoose = require('mongoose');

const RequestSchema = {
  user_id: { type: String, required: true },
  sitter_id: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  accepted: { type: Boolean, default: false },
  declined: { type: Boolean, default: false },
  paid: { type: Boolean, default: false },
};

const Request = mongoose.model('Request', RequestSchema);

module.exports = Request;
