'use strict';
var Request = require('../../models/request');

exports.getAllEvents = function (req, res) {
	Request.find({}, function(err, data) {
		if (err) {
			res.status(500).json({message: 'Error getting events from database'});
		}
		else {
			res.status(200).json(data);
		}
	});
};

exports.createEvent = function (req, res) {
	var request = new Request(req.body);
	request.dateCreated = new Date();

	request.save(function(err, data) {
		if (err) {
			res.status(500).json({message: 'Error saving event to database'});
		}
		else {
			res.location('/events/' + data._id);
			res.status(201).json(data);
		}
	});
};

exports.getEventById = function (req, res) {
	var id = req.params.id;

	Request.findOne({_id:id}, function(err, data) {
		if (err) {
			res.status(404).json({message: 'Event not found with id: ' + id});
		}
		else {
			res.status(200).json(data);
		}
	});
};

exports.updateEvent = function (req, res) {
	var request = req.body;
	var id = req.params.id;

	// Remove fields we don't want to update from model
	delete request._id;
	delete request.dateCreated;
	delete request.__v;

	Request.findOneAndUpdate({_id:id}, request, function(err) {
		if (err) {
			res.status(500).json({message:'Error updating document'});
		}
		else {
			res.status(204).json();
		}
	});
};

exports.deleteEvent = function (req, res) {
	var id = req.params.id;

	Request.findOneAndRemove({_id:id}, function(err) {
		if (err) {
			res.status(404).json({message: 'Event not found with id: ' + id});
		}
		else {
			res.status(204).json();
		}
	});
};

exports.getEventResponses = function(req, res) {
	var id = req.params.id;

	Request.findOne({_id:id}, function(err, data) {
		if (err) {
			res.status(404).json({message: 'Event not found with id: ' + id});
		}
		else {
			res.status(201).json(data.responses);
		}
	});
};

exports.createResponse = function(req, res) {
	var response = req.body;
	var id = req.params.id;
	console.log(response);

	Request.findOne({_id:id}, function(err, data) {
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
};


// TODO: Add in a delete response endpoint
// Use this: Request.findOneAndRemove({"responses._id":ObjectId("57bb3e140f32831f00467a13")})
