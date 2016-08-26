/**
 * @module EmailController
 */
'use strict';
var nodemailer = require('nodemailer'),
	mg = require('nodemailer-mailgun-transport'),
	handlebars = require('handlebars');

// This is your API key that you retrieve from www.mailgun.com/cp (free up to 10K monthly emails)
var auth = {
  auth: {
    api_key: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
};

var nodemailerMailgun = nodemailer.createTransport(mg(auth));

function sendMail(req, res) {
	var context = {};
	nodemailerMailgun.sendMail({
		from: 'Scheduling Hero <noreply@schedulinghero.com>',
		to: 'johnwoodruff91@gmail.com',
		cc:'kaitlynwoodruff94@gmail.com',
		//   bcc:'secretagent@company.gov',
		subject: 'Test Email!',
		//   'h:Reply-To': 'reply2this@company.com',
		template: {
			name: 'base-template.hbs',
			engine: handlebars,
			context: context
		}
	}, function (err, info) {
	if (err) {
		console.log('Error: ' + err);
		res.status(500).json({message: 'error occurred'});
	}
	else {
		console.log('Response: ' + info);
		res.status(204).json();
	}
	});
}

exports.sendMail = sendMail;
