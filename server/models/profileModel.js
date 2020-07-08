const mongoose = require('mongoose');

const profileSchema = {
    firstName:{
      type: String,
      required: true
    },
    lastName:{
      type: String,
      required: true
    },
    gender:{
      type: String
    },
    birthDate:{
      type: Date
    },
    email:{
      type: String,
      required: true
    },
    phone:{
      type: String
    },
    address:{
      type: String
    },
    description:{
      type: String
    },
    available:{
      type: Boolean
    }
  }
  
  const Profile = mongoose.model('Profile', profileSchema);

  module.exports = Profile;