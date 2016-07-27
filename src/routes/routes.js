'use strict';

var express = require('express'),
	router = express.Router(),
	jwt = require('jsonwebtoken'),
	passport = require('passport'),
	GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
	TestCtrl = require('./test/test.controller'),
	User = require('../models/user'),
	UserCtrl = require('./users/users.controller'),
	EventCtrl = require('./events/events.controller');

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

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({userId:id}, function(err, user) {
    done(err, user);
  });
});

// TEST ROUTE
router.get('/hello', TestCtrl.hello);

// AUTH ROUTES
router.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login','email','profile'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/hello' }), function(req, res) {
	res.status(200).json(req.user);
});

// USER ROUTES
router.get('/users', UserCtrl.getAllUsers);
router.post('/users', UserCtrl.createUser);
router.get('/users/:id', UserCtrl.getUserById);
router.get('/users/:id/events', UserCtrl.getEventsByUser);
router.put('/users/:id', UserCtrl.updateUser);
router.delete('/users/:id', UserCtrl.deleteUser);

// EVENT ROUTES
router.get('/events', EventCtrl.getAllEvents);
router.post('/events', EventCtrl.createEvent);
router.get('/events/:id', EventCtrl.getEventById);
router.put('/events/:id', EventCtrl.updateEvent);
router.delete('/events/:id', EventCtrl.deleteEvent);

module.exports = router;
