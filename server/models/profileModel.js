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
      type: String,
      required: true
    },
    birthDate:{
      type: Date,
      required: true
    },
    email:{
      type: String,
      required: true
    },
    phone:{
      type: Number,
      required: true
    },
    address:{
      type: String,
      required: true
    },
    description:{
      type: String,
      required: true
    },
    availability:{
      type: Boolean,
      required: true
    }
  }
  
  const Profile = mongoose.model('Profile', profileSchema);

  export default Profile;