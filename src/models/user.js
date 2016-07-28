'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
	userId: String,
	firstName: String,
	lastName: String,
	dateCreated: Date,
	email: String,
	profilePhoto: String
});

module.exports = mongoose.model("User", userSchema);
