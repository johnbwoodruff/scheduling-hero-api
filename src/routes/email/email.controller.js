/**
 * @module EmailController
 */
'use strict';
var nodemailer = require('nodemailer'),
	mg = require('nodemailer-mailgun-transport');

var auth = {
  auth: {
    api_key: process.env.MAILGUN_KEY,
    domain: process.env.MAILGUN_DOMAIN
  }
};

var nodemailerMailgun = nodemailer.createTransport(mg(auth));

/**
 * @description Send an HTML email using Mailgun
 * 
 * @param {Request} req An HTTP Request
 * @param {Response} res An HTTP Response
 * 
 * @returns 204 No Content
 */
function sendMail(req, res) {
	var body = req.body;
	var options = {
		from: 'Scheduling Hero <noreply@schedulinghero.com>',
		to: body.to,
		// 'h:Reply-To': 'reply2this@company.com',
		subject: body.subject,
		html: body.html
	};
	if(body.cc) {
		options.cc = body.cc;
	}
	if(body.bcc) {
		options.bcc = body.bcc;
	}
	nodemailerMailgun.sendMail(options, function (err) {
		if (err) {
			res.status(500).json({message: 'error occurred'});
		}
		else {
			res.status(204).json();
		}
	});
}

exports.sendMail = sendMail;
