'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * Creates a new User
 * @class
 */
var User = new Schema({
	userId: String,
	firstName: String,
	lastName: String,
	dateCreated: Date,
	email: String,
	profilePhoto: String,
	refreshToken: String
});

module.exports = mongoose.model("User", User);
