/**
 * @module AuthController
 */
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
		if (user) {
			return done(err, user);
		}
		else {
			var newUser = new User({
				userId: profile.id,
				firstName: userInfo.given_name,
				lastName: userInfo.family_name,
				dateCreated: new Date(),
				email: userInfo.email,
				profilePhoto: userInfo.picture,
				refreshToken: refreshToken.access_token
			});
			newUser.save(function(error, data) {
				if(error) {
					console.log(error);
				}
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

/**
 * @description Initial Authentication Method
 * 
 * @returns Redirect to /auth/google/callback
 */
function loginGoogle() {
	passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login','email','profile'] });
}

/**
 * @description Google Authentication Callback
 * 
 * @returns Redirect to the frontend /authredirect with an access_token query param
 */
function googleCallback() {
	passport.authenticate('google', { failureRedirect: '/hello' });
}

// Function on Successful Login
function successfulLogin(req, res) {
	return res.redirect(301, 'http://localhost:4200/authredirect?access_token=' + req.user.refreshToken);
}

exports.successfulLogin = successfulLogin;
exports.loginGoogle = loginGoogle;
exports.googleCallback = googleCallback;
