'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var passport = require('passport');
var cors = require('cors');

console.log(process.env.NODE_ENV);

// load local .env config if in development
if(process.env.NODE_ENV === 'development') {
	require('dotenv').config(); // GET CONFIG
}

var port = 3000;
var app = express();
var routes = require('./routes/routes');
var db = require('./db/db');
var prepopulate = require('./db/prepopulate');

app.use(cors());

db.once('open', function () {
	// Connection to database now open
	console.log('Connection succeeded.');
	// If in dev mode and db is empty, prepopulate db
	if(process.env.NODE_ENV === 'development') {
		prepopulate.databaseIsEmpty(function(hasUsers) {
			if(!hasUsers) {
				prepopulate.populateDatabase();
			}
		});
	}
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

// Use routes.index to map URLs to handlers in ./api
app.use('/', routes);

// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// development error handler
// will print stacktrace
if (process.env.NODE_ENV === 'development') {
	app.use(function (err, req, res) {
		var status = err.status || 500;
		res.status(status).json({
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
	var status = err.status || 500;
	res.status(status).json({
		message: err.message
	});
});

app.listen(port, function(){
	console.log('Server listening on port ' + port);
});
