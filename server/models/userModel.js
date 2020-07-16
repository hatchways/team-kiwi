const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
mongoose.promise = Promise;

const userSchema = new Schema(
  {
    firstName: { type: String, unique: false },
    lastName: { type: String, unique: false },
    password: { type: String, unique: false },
    userEmail: { type: String, unique: true },
    profile: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
    },
  },
  {
    timestamps: true,
  }
);

// Define schema methods
userSchema.methods = {
  checkPassword: function (inputPassword) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(inputPassword, this.password, (err, success) => {
        if (err) return reject(err);
        return resolve(success);
      });
    });
  },
  // it hashes the password
  hashPassword: (plainTextPassword) => {
    // the second parameter is the salt length to generate
    return bcrypt.hashSync(plainTextPassword, 10);
  },
};

// Define hooks for pre-saving
userSchema.pre('save', function (next) {
  if (!this.password) {
    next();
  } else {
    this.password = this.hashPassword(this.password);
    // so the next() function is needed to move on to the next middleware method
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
