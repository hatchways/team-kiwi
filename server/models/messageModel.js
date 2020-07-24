const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const messageSchema = {
  conversation_id: { type: Schema.Types.ObjectId },
  sender: { type: Schema.Types.ObjectId },
  content: { type: String },
  created_date: { type: Date, default: Date.now },
};

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
