'use strict';
var User = require('../../models/user'),
	Events = require('../../models/request');


exports.getAllUsers = function (req, res) {
	User.find({}, function(err,data) {
		if(err) {
			res.status(500).json({message: 'Error getting users from database'});
		}
		else {
			res.status(200).json(data);
		}
	});
};

exports.createUser = function (req, res) {
	var user = new User(req.body);
	user.dateCreated = new Date();

	user.save(function(err, data) {
		if(err) {
			res.status(500).json({message: 'Error saving user to database'});
		}
		else {
			res.location('/users/' + data._id);
			res.status(201).json(data);
		}
	});
};

exports.getUserById = function (req, res) {
	var id = req.params.id;

	User.findOne({_id:id}, function(err, data) {
		if(err) {
			res.status(404).json({message: 'User not found of id: ' + id});
		}
		else {
			res.status(200).json(data);
		}
	});
};

exports.getEventsByUser = function (req, res) {
	var id = req.params.id;

	Events.find({requestedBy:id}, function (err, data) {
		if (err) {
			res.status(500).json({message: 'Database access error.'});
		}
		else {
			res.status(200).json(data);
		}
	});
};

exports.updateUser = function (req, res) {
	var user = req.body;
	var id = req.params.id;

	// Remove fields we don't want to update from model
	delete user._id;
	delete user.dateCreated;
	delete user.__v;

	User.findOneAndUpdate({_id:id}, user, function(err) {
		if(err) {
			res.status(500).json({message:'Error updating document'});
		}
		else {
			res.status(204).json();
		}
	});
};

exports.deleteUser = function (req, res) {
	var id = req.params.id;

	User.findOneAndRemove({_id:id}, function(err) {
		if(err) {
			res.status(404).json({message: 'User not found of id: ' + id});
		}
		else {
			res.status(204).json();
		}
	});
};
