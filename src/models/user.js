'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
	userId: String,
	username: String,
	dateCreated: Date,
	email: String
});

module.exports = mongoose.model("User", userSchema);
