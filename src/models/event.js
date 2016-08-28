'use strict';

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * Creates a new Event
 * @class
 */
var Event = new Schema({
	organizer: Schema.Types.ObjectId,
	dateCreated: Date,
	targetStartDate: Date,
	targetEndDate: Date,
	actualStartDate: Date,
	actualEndDate: Date,
	title: String,
	description: String,
	location: String,
	invitees: [{
		name: String,
		email: String
	}],
	responses: [{
		inviteeEmail: String,
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
