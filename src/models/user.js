'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
	userId: String,
	username: String,
	dateCreated: Date,
	email: String,
	requests: [{
		dateCreated: Date,
		targetStartDate: Date,
		targetEndDate: Date,
		title: String,
		description: String,
		location: String,
		invitees: [String], // List of email addresses
		responses: [] // Not defined yet as we are not sure how we want these to look.
	}]
});

module.exports = mongoose.model("User", userSchema);
