const User = require('../models/userModel')
const LocalStrategy = require('passport-local').Strategy

const strategy = new LocalStrategy(
	{
		usernameField: 'userEmail' // not necessary, DEFAULT
	},
	function (userEmail, password, done) {
		//console.log("In localStrategy", userEmail, password)

		// Validation to verify password and email match
		User.findOne({ userEmail: userEmail }, (err, user) => {
			if (err) {
				return done(err)
			}
			if (!user) {
				console.log('incorrect email')
				return done(null, false, { message: 'Incorrect Email' })
			}
			if (!user.checkPassword(password)) {
				console.log('incorrect password');
				return done(null, false, { message: 'Incorrect password' })
			}
			return done(null, user)
		})
	}
)

module.exports = strategy
