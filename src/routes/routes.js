'use strict';

var express = require('express'),
	router = express.Router(),
	Test = require('./test/test.controller'),
	Users = require('./users/users.controller'),
	Events = require('./events/events.controller');

// TEST ROUTE
router.get('/hello', Test.hello);

// USER ROUTES
router.get('/users', Users.getAllUsers);
router.post('/users', Users.createUser);
router.get('/users/:id', Users.getUserById);
router.get('/users/:id/events', Users.getEventsByUser);
router.put('/users/:id', Users.updateUser);
router.delete('/users/:id', Users.deleteUser);

// EVENT ROUTES
router.get('/events', Events.getAllEvents);
router.post('/events', Events.createEvent);
router.get('/events/:id', Events.getEventById);
router.put('/events/:id', Events.updateEvent);
router.delete('/events/:id', Events.deleteEvent);

module.exports = router;
