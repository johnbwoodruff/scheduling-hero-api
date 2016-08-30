/**
 * @module EmailController
 */
'use strict';
var nodemailer = require('nodemailer'),
	_ = require('underscore'),
	ics = require('ics'),
	mg = require('nodemailer-mailgun-transport'),
	Event = require('../../models/event'),
	User = require('../../models/user');

var auth = {
	auth: {
		api_key: process.env.MAILGUN_KEY,
		domain: process.env.MAILGUN_DOMAIN
	}
};

var nodemailerMailgun = nodemailer.createTransport(mg(auth));

function sendEmail(email, cb) {
	var options = {
		from: 'Scheduling Hero <noreply@schedulinghero.com>',
		to: email.to,
		// 'h:Reply-To': 'reply2this@company.com',
		subject: email.subject,
		html: email.html
	};
	if (email.cc) {
		options.cc = email.cc;
	}
	if (email.bcc) {
		options.bcc = email.bcc;
	}
	if (email.attachments) {
		options.attachments = email.attachments;
	}
	nodemailerMailgun.sendMail(options, function (err) {
		var status = err ? false : true;
		cb(status);
	});
}

/**
 * @description Send an HTML email using Mailgun
 * 
 * @param {Request} req An HTTP Request
 * @param {Response} res An HTTP Response
 * 
 * @returns 204 No Content
 */
function sendMessage(req, res) {
	var body = req.body;
	sendEmail(body, function(success) {
		if(success) {
			res.status(204).json();
		}
		else {
			res.status(500).json({message: 'Error occurred sending message.'});
		}
	});
}

function sendEventInvitation(req, res) {
	var id = req.params.id;

	Event.findOne({_id:id}, function(err, event) {
		if(err) {
			res.status(404).json({message: 'Event not found with id: ' + id});
		}
		else {
			User.findOne({_id:event.organizer}, function(err, user) {
				if(err) {
					res.status(404).json({message: 'Organizer not found'});
				}
				else {
					var icsOptions = {
						eventName: event.title,
						filename: 'invite.ics',
						dtstart: event.actualStartDate,
						dtend: event.actualEndDate,
						description: event.description,
						location: event.location,
						organizer: {
							name: user.firstName + ' ' + user.lastName,
							email: user.email
						},
						attendees: _.map(event.invitees, function(person) {
							return {
								name: person.name,
								email: person.email,
								rsvp: true
							};
						})
					};
					// Make sure organizer is an attendee as well.
					icsOptions.attendees.push({
						name: user.firstName + ' ' + user.lastName,
						email: user.email,
						rsvp: true
					});
					var iCalString = ics.getEvent(icsOptions);
					var email = {
						to: _.map(event.invitees, function(invitee) {
							return invitee.email;
						}),
						subject: "Invitation to Event",
						html: "<p>Check it out yo!</p>",
						attachments: [{
							filename: 'invite.ics',
							content: new Buffer(iCalString, 'utf-8')
						}]
					};
					email.to.push(user.email);
					sendEmail(email, function(success) {
						if(success) {
							res.status(204).json();
						}
						else {
							res.status(500).json({message: 'Error occurred sending message.'});
						}
					});
				}
			});
		}
	});
}

exports.sendMessage = sendMessage;
exports.sendEventInvitation = sendEventInvitation;
