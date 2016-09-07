'use strict';

var Event = require('../models/event'),
	User = require('../models/user');

var userIds = [];

function populateUsers() {
	// Used http://www.fakemailgenerator.com to get emails
	var user = new User({
		userId: 'dc8afe3b4640421da3f1b0b4ce91a849',
		firstName: 'Richard',
		lastName: 'Gascon',
		dateCreated: new Date('08/22/2016'),
		email: 'richardegascon@armyspy.com',
		profilePhoto: 'https://static.pexels.com/photos/1336/black-and-white-man-person-eyes.jpg',
		refreshToken: 'xG1sw4vV0LymwB4cc9B8R8UO3FPOJ6vhJ59vK7e0UYpCFIFZAR'
	});
	user.save(function(err, data) {
		console.log(`Saved ${data.firstName} ${data.lastName}`);
		userIds.push(data._id);
	});

	var user2 = new User({
		userId: '14471c78d9f64cfc892f5112118a82f0',
		firstName: 'Barbra',
		lastName: 'Buckner',
		dateCreated: new Date('08/25/2016'),
		email: 'barbrambuckner@jourrapide.com',
		profilePhoto: 'https://static.pexels.com/photos/26739/pexels-photo-26739.jpg',
		refreshToken: 'vZVfgBQq3Ko8HzBNqLXO0MweCsVqGrkjD1E850mbIwYja34vqU'
	});
	user2.save(function(err, data) {
		console.log(`Saved ${data.firstName} ${data.lastName}`);
		userIds.push(data._id);
	});

	var user3 = new User({
		userId: '130a7627d8ad4d6bb8c9e53777dbdaf2',
		firstName: 'Kimberly',
		lastName: 'Johnson',
		dateCreated: new Date('06/14/2016'),
		email: 'kimberlysjohnson@rhyta.com',
		profilePhoto: 'https://static.pexels.com/photos/61100/pexels-photo-61100.jpeg',
		refreshToken: 'nhpjp4BAaPOAhOzBOoGxIg39CpiWgReSLaqhgOzD94TO5UILiJ'
	});
	user3.save(function(err, data) {
		console.log(`Saved ${data.firstName} ${data.lastName}`);
		userIds.push(data._id);
	});
}

function populateEvents() {
	var event1 = new Event({
		organizer: userIds[0],
		dateCreated: new Date('2016-09-01T13:22:04.912Z'),
		targetStartDate: new Date('2016-09-03T19:00:00.912Z'),
		targetEndDate: new Date('2016-09-06T22:00:00.912Z'),
		title: 'Team Building Party',
		description: 'We will be playing Battlefront',
		location: 'The Boss\'s Office',
		invitees: [
			{name:'Donald Talton', email:'donaldktalton@rhyta.com'},
			{name:'Scott Jones', email:'scottmjones@teleworm.us'},
			{name:'Frankie Strickland', email:'frankierstrickland@teleworm.us'}
		],
		responses: []
	});
	event1.save(function(err, data) {
		console.log(`Saved event ${data.title}`);
	});

	var event2 = new Event({
		organizer: userIds[1],
		dateCreated: new Date('2016-08-12T15:22:24.912Z'),
		targetStartDate: new Date('2016-08-23T16:00:00.912Z'),
		targetEndDate: new Date('2016-08-27T20:00:00.912Z'),
		title: 'Hackathon',
		description: 'Such coding will go down!!!',
		location: 'Will\'s House',
		invitees: [
			{name:'Willam Banks', email:'williamdbanks@rhyta.com'},
			{name:'Mary Dougherty', email:'maryldougherty@rhyta.com'},
			{name:'Willie Fisher', email:'williejfisher@rhyta.com'},
			{name:'Amber Stevens', email:'amberdstevens@rhyta.com'}
		],
		responses: []
	});
	event2.save(function(err, data) {
		console.log(`Saved event ${data.title}`);
	});

	var event3 = new Event({
		organizer: userIds[1],
		dateCreated: new Date('2016-08-13T16:02:12.912Z'),
		targetStartDate: new Date('2016-08-18T13:00:00.912Z'),
		targetEndDate: new Date('2016-08-27T17:00:00.912Z'),
		title: 'Study Group',
		description: 'CS Test Prep',
		location: 'The Library',
		invitees: [
			{name:'Willam Banks', email:'williamdbanks@rhyta.com'},
			{name:'Mary Dougherty', email:'maryldougherty@rhyta.com'},
			{name:'Willie Fisher', email:'williejfisher@rhyta.com'},
			{name:'Amber Stevens', email:'amberdstevens@rhyta.com'},
			{name:'Cathy Westfall', email:'cathydwestfall@teleworm.us'}
		],
		responses: [
			{
				inviteeEmail: 'cathydwestfall@teleworm.us',
				availability: [
					{
						date: new Date('2016-08-18T00:00:00.912Z'),
						times: [
							{
								startTime: '1400',
								endTime: '1530'
							},
							{
								startTime: '1630',
								endTime: '2000'
							}
						]
					},
					{
						date: new Date('2016-08-22T00:00:00.912Z'),
						times: [
							{
								startTime: '1000',
								endTime: '1200'
							},
							{
								startTime: '1430',
								endTime: '1700'
							},
							{
								startTime: '1900',
								endTime: '2200'
							}
						]
					}
				]
			},
			{
				inviteeEmail: 'maryldougherty@rhyta.com',
				availability: [
					{
						date: new Date('2016-08-20T00:00:00.912Z'),
						times: [
							{
								startTime: '1200',
								endTime: '2200'
							}
						]
					},
					{
						date: new Date('2016-08-21T00:00:00.912Z'),
						times: [
							{
								startTime: '1200',
								endTime: '2200'
							}
						]
					},
					{
						date: new Date('2016-08-22T00:00:00.912Z'),
						times: [
							{
								startTime: '1200',
								endTime: '2200'
							}
						]
					},
					{
						date: new Date('2016-08-23T00:00:00.912Z'),
						times: [
							{
								startTime: '1200',
								endTime: '2200'
							}
						]
					}
				]
			}
		]
	});
	event3.save(function(err, data) {
		console.log(`Saved event ${data.title}`);
	});

	var event4 = new Event({
		organizer: userIds[2],
		dateCreated: new Date('2016-10-31T12:03:12.912Z'),
		targetStartDate: new Date('2016-10-31T18:00:00.912Z'),
		targetEndDate: new Date('2016-10-31T23:30:00.912Z'),
		title: 'Halloween Party!!!',
		description: 'There will be a LOT, and I mean a LOT of candy. Seriously. Be prepared.',
		location: 'Kim\'s House',
		invitees: [
			{name:'Timothy Cobb', email:'timothyvcobb@armyspy.com'},
			{name:'George Gaines', email:'georgeggaines@rhyta.com'},
			{name:'Christopher Buckingham', email:'christophercbuckingham@armyspy.com'},
			{name:'Ruben Barnes', email:'rubenbbarnes@jourrapide.com'},
			{name:'Bradley Hoffman', email:'bradleylhoffman@dayrep.com'},
			{name:'Monica Elzey', email:'monicarelzey@rhyta.com'}
		],
		responses: [
			{
				inviteeEmail: 'cathydwestfall@teleworm.us',
				availability: [
					{
						date: new Date('2016-08-18T00:00:00.912Z'),
						times: [
							{
								startTime: '1400',
								endTime: '1530'
							},
							{
								startTime: '1630',
								endTime: '2000'
							}
						]
					},
					{
						date: new Date('2016-08-22T00:00:00.912Z'),
						times: [
							{
								startTime: '1000',
								endTime: '1200'
							},
							{
								startTime: '1430',
								endTime: '1700'
							},
							{
								startTime: '1900',
								endTime: '2200'
							}
						]
					}
				]
			},
			{
				inviteeEmail: 'maryldougherty@rhyta.com',
				availability: [
					{
						date: new Date('2016-08-20T00:00:00.912Z'),
						times: [
							{
								startTime: '1200',
								endTime: '2200'
							}
						]
					},
					{
						date: new Date('2016-08-21T00:00:00.912Z'),
						times: [
							{
								startTime: '1200',
								endTime: '2200'
							}
						]
					},
					{
						date: new Date('2016-08-22T00:00:00.912Z'),
						times: [
							{
								startTime: '1200',
								endTime: '2200'
							}
						]
					},
					{
						date: new Date('2016-08-23T00:00:00.912Z'),
						times: [
							{
								startTime: '1200',
								endTime: '2200'
							}
						]
					}
				]
			}
		]
	});
	event4.save(function(err, data) {
		console.log(`Saved event ${data.title}`);
	});
}

exports.populateDatabase = function() {
	console.log('***************** POPULATING DATABASE *****************');
	populateUsers();
	populateEvents();
};


exports.databaseIsEmpty = function(cb) {
	User.find({}, function(err, data) {
		var hasUsers = true;
		if(data.length === 0) {
			hasUsers = false;
		}
		cb(hasUsers);
	});
};
