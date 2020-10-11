const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

const profileSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String },
    birthDate: { type: Date },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    address: { type: String },
    description: { type: String },
    available: { type: Boolean, default: false },
    profileImg: { type: String },
    albumImgs: { type: [String] },
    userID: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
