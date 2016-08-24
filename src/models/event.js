'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * Creates a new Event
 * @class
 */
var Event = new Schema({
	event: Schema.Types.ObjectId,
	dateCreated: Date,
	targetStartDate: Date,
	targetEndDate: Date,
	title: String,
	description: String,
	location: String,
	invitees: [String], // List of email addresses
	responses: [{
		invitee: String,
		availability: [{
			date: Date,
			times: [{ // List of start and end availability times
				startTime: String,
				endTime: String
			}]
		}]
	}]
});

module.exports = mongoose.model("Event", Event);
