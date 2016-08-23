'use strict';
var User = require('../../models/user'),
	Events = require('../../models/request');

/**
 * @description Get all active users in the database
 * 
 * @param {Request} req An HTTP Request
 * @param {Response} res An HTTP Response
 * 
 * @returns {User[]} 200 Ok 
 */
function getAllUsers(req, res) {
	User.find({}, function(err,data) {
		if(err) {
			res.status(500).json({message: 'Error getting users from database'});
		}
		else {
			res.status(200).json(data);
		}
	});
}

/**
 * @description Create a new user
 * 
 * @param {Request} req An HTTP Request
 * @param {Response} res An HTTP Response
 * 
 * @returns {User} 201 Created
 */
function createUser(req, res) {
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
}

/**
 * @description Get a single user by ID
 * 
 * @param {Request} req An HTTP Request
 * @param {Response} res An HTTP Response
 * 
 * @returns {User} 200 Ok 
 */
function getUserById(req, res) {
	var id = req.params.id;

	User.findOne({_id:id}, function(err, data) {
		if(err) {
			res.status(404).json({message: 'User not found of id: ' + id});
		}
		else {
			res.status(200).json(data);
		}
	});
}

/**
 * @description Get all events created by a specific user
 * 
 * @param {Request} req An HTTP Request
 * @param {Response} res An HTTP Response
 * 
 * @returns {Event[]} 200 Ok 
 */
function getEventsByUser(req, res) {
	var id = req.params.id;

	Events.find({requestedBy:id}, function (err, data) {
		if (err) {
			res.status(500).json({message: 'Database access error.'});
		}
		else {
			res.status(200).json(data);
		}
	});
}

/**
 * @description Update a single user's info
 * 
 * @param {Request} req An HTTP Request
 * @param {Response} res An HTTP Response
 * 
 * @returns 204 No Content 
 */
function updateUser(req, res) {
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
}

/**
 * @description Mark a user as inactive in the database
 * 
 * @param {Request} req An HTTP Request
 * @param {Response} res An HTTP Response
 * 
 * @returns 204 No Content 
 */
function deleteUser(req, res) {
	// TODO: Instead of deleting the user, simply mark them as inactive
	var id = req.params.id;

	User.findOneAndRemove({_id:id}, function(err) {
		if(err) {
			res.status(404).json({message: 'User not found of id: ' + id});
		}
		else {
			res.status(204).json();
		}
	});
}

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.getUserById = getUserById;
exports.getEventsByUser = getEventsByUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
