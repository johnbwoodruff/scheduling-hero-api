'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var requestSchema = new Schema({
	requestedBy: Schema.Types.ObjectId,
	dateCreated: Date,
	targetStartDate: Date,
	targetEndDate: Date,
	title: String,
	description: String,
	location: String,
	invitees: [String], // List of email addresses
	responses: [] // Not defined yet as we are not sure how we want these to look.
});

module.exports = mongoose.model("Request", requestSchema);
