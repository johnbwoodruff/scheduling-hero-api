/**
 * @module EventsController
 */
'use strict';
var Event = require('../../models/event');

/**
 * @description Get all events in the database
 *
 * @param {Request} req An HTTP Request
 * @param {Response} res An HTTP Response
 *
 * @returns {Event[]} 200 Ok
 */
function getAllEvents(req, res) {
	Event.find({}, function(err, data) {
		if (err) {
			res.status(500).json({message: 'Error getting events from database'});
		}
		else {
			res.status(200).json(data);
		}
	});
}

/**
 * @description Create a new event
 *
 * @param {Request} req An HTTP Request
 * @param {Response} res An HTTP Response
 *
 * @returns {Event} 201 Created
 */
function createEvent(req, res) {
	var event = new Event(req.body);
	event.dateCreated = new Date();

	event.save(function(err, data) {
		if (err) {
			res.status(500).json({message: 'Error saving event to database'});
		}
		else {
			res.location('/events/' + data._id);
			res.status(201).json(data);
		}
	});
}

/**
 * @description Get a single event by ID
 *
 * @param {Request} req An HTTP Request
 * @param {Response} res An HTTP Response
 *
 * @returns {Event} 200 Ok
 */
function getEventById(req, res) {
	var id = req.params.id;

	Event.findOne({_id:id}, function(err, data) {
		if (err) {
			res.status(404).json({message: 'Event not found with id: ' + id});
		}
		else {
			res.status(200).json(data);
		}
	});
}

/**
 * @description Update a single event's info
 *
 * @param {Request} req An HTTP Request
 * @param {Response} res An HTTP Response
 *
 * @returns 204 No Content
 */
function updateEvent(req, res) {
	var request = req.body;
	var id = req.params.id;

	// Remove fields we don't want to update from model
	delete event._id;
	delete event.dateCreated;
	delete event.__v;

	Event.findOneAndUpdate({_id:id}, request, function(err) {
		if (err) {
			res.status(500).json({message:'Error updating document'});
		}
		else {
			res.status(204).json();
		}
	});
}

/**
 * @description Delete an event from the database
 *
 * @param {Request} req An HTTP Request
 * @param {Response} res An HTTP Response
 *
 * @returns 204 No Content
 */
function deleteEvent(req, res) {
	var id = req.params.id;

	Event.findOneAndRemove({_id:id}, function(err) {
		if (err) {
			res.status(404).json({message: 'Event not found with id: ' + id});
		}
		else {
			res.status(204).json();
		}
	});
}

/**
 * @description Get all responses for a specific event
 *
 * @param {Request} req An HTTP Request
 * @param {Response} res An HTTP Response
 *
 * @returns {EventResponse[]} 200 Ok
 */
function getEventResponses(req, res) {
	var id = req.params.id;

	Event.findOne({_id:id}, function(err, data) {
		if (err) {
			res.status(404).json({message: 'Event not found with id: ' + id});
		}
		else {
			res.status(200).json(data.responses);
		}
	});
}

/**
 * @description Create a new response for a specific event
 *
 * @param {Request} req An HTTP Request
 * @param {Response} res An HTTP Response
 *
 * @returns {Event} 201 Created
 */
function createResponse(req, res) {
	var response = req.body;
	var id = req.params.id;
	console.log(response);

	Event.findOne({_id:id}, function(err, data) {
		if (err) {
			res.status(404).json({message: 'Event not found with id: ' + id});
		}
		else {
			data.responses.push(response);
			data.save(function() {
				res.status(201).json(data);
			});
		}
	});
}

/**
 * @description Sets actual start and end dates for a specific event
 *
 * @param {Request} req An HTTP Request
 * @param {Response} res An HTTP Response
 *
 * @returns 204 No Content
 */
function setActualDates(req, res) {
	var response = req.body;
	var id = req.params.id;

	Event.findOne({_id:id}, function(err, data) {
		if (err) {
			res.status(404).json({message: 'Event not found with id: ' + id});
		}
		else {
			data.actualStartDate = response.actualStartDate;
			data.actualEndDate = response.actualEndDate;
			data.save(function() {
				res.status(204).json();
			});
		}
	});
}

/**
 * @description Delete a response for a specific event
 *
 * @param {Request} req An HTTP Request
 * @param {Response} res An HTTP Response
 *
 * @returns 204 No Content
 */
function deleteResponse(req, res) {
	var id = req.params.responseId;

	Event.findOne({'responses._id':id}, function(err, data) {
		if (err) {
			res.status(404).json({message: 'Response not found with id: ' + id});
		}
		else {
			for(var i = 0; i < data.responses.length; i++) {
				if(data.responses[i]._id == id) {
					data.responses.splice(i,1);
					break;
				}
			}
			data.save(function() {
				res.status(204).json();
			});
		}
	});
}

exports.getAllEvents = getAllEvents;
exports.createEvent = createEvent;
exports.getEventById = getEventById;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
exports.getEventResponses = getEventResponses;
exports.createResponse = createResponse;
exports.setActualDates = setActualDates;
exports.deleteResponse = deleteResponse;
