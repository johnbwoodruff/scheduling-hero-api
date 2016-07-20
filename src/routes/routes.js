'use strict';

var express = require('express'),
	router = express.Router(),
	Test = require('./test/test.controller'),
	Users = require('./users/users.controller');

// TEST ROUTE
router.get('/hello', Test.hello);

// USER ROUTES
router.get('/users', Users.getAllUsers);
router.post('/users', Users.createUser);
router.get('/users/:id', Users.getUserById);
router.put('/users/:id', Users.updateUser);
router.delete('/users/:id', Users.deleteUser);

module.exports = router;
