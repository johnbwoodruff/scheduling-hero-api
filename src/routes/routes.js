'use strict';

var express = require('express'),
	router = express.Router(),
	Test = require('./test/test.controller');

// TEST ROUTE
router.get('/hello', Test.hello);

module.exports = router;
