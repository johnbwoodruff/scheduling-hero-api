'use strict';

var express = require('express'),
	router = express.Router(),
	AuthCtrl = require('./auth/auth.controller'),
	TestCtrl = require('./test/test.controller'),
	UserCtrl = require('./users/users.controller'),
	EventCtrl = require('./events/events.controller');

// TEST ROUTE
router.get('/hello', TestCtrl.hello);

// AUTH ROUTES
router.get('/auth/google', AuthCtrl.loginGoogle);
router.get('/auth/google/callback', AuthCtrl.googleCallback, AuthCtrl.successfulLogin);

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
router.get('/events/:id/responses', EventCtrl.getEventResponses);
router.post('/events/:id/responses', EventCtrl.createResponse);
router.delete('/events/:id/responses/:responseId', EventCtrl.deleteResponse);


module.exports = router;
