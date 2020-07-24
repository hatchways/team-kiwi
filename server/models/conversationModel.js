const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const conversationSchema = {
  participants: { type: [Schema.Types.ObjectId] },
};

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;
