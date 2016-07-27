'use strict';
var jwt = require('jsonwebtoken'),
	passport = require('passport'),
	User = require('../../models/user'),
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// PASSPORT REQUIRED MIDDLEWARE
passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_ID,
	clientSecret: process.env.GOOGLE_SECRET,
	callbackURL: "http://localhost:3000/auth/google/callback"
}, function (req, accessToken, refreshToken, profile, done) {
	User.findOne({ userId: profile.id }, function (err, user) {
		var userInfo = jwt.decode(refreshToken.id_token);
		if(user) {
			return done(err, user);
		}
		else {
			var newUser = new User({
				userId: profile.id,
				firstName: userInfo.given_name,
				lastName: userInfo.family_name,
				dateCreated: new Date(),
				email: userInfo.email,
				profilePhoto: userInfo.picture
			});
			newUser.save(function(error, data) {
				return done(err, data);
			});
		}
	});
}));

// Required for Passport to function correctly
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Required for Passport to function correctly
passport.deserializeUser(function(id, done) {
  User.findOne({userId:id}, function(err, user) {
    done(err, user);
  });
});

// Initial Authentication Method
exports.loginGoogle = passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login','email','profile'] });

// Google Authentication Callback
exports.googleCallback = passport.authenticate('google', { failureRedirect: '/hello' });

// Function on Successful Login
exports.successfulLogin = function(req, res) {
	res.status(200).json(req.user);
};
