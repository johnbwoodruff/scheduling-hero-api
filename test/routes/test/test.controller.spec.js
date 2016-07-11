'use strict';

var httpMocks = require('node-mocks-http');
var testController = require('../../../src/routes/test/test.controller');

describe('Test Hello World Controller', function() {
	var request, response;

	beforeEach(function() {
		request = httpMocks.createRequest({
			method: 'GET',
			url: '/hello'
		});
		response = httpMocks.createResponse();
	});

	it('should send the proper hello world response', function() {
		testController.hello(request, response);
		expect(response.statusCode).toBe(200);
		var data = JSON.parse(response._getData());
		expect(data.message).toEqual('Hello World!');
	});
});
