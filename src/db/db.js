'use strict';

var mongoose = require('mongoose');
if (mongoose.connection.readyState !== 1) {
	mongoose.connect('mongodb://whattime_db_1:27017/test');
}

mongoose.connection.on('error', console.error.bind(console, 'connection error'));

module.exports = mongoose.connection;
