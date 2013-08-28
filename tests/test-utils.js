// Import CoffeeScript.
require('coffee-script');

// Importing module.
var utils = require('../lib/utils');

// Test for md5 function.
exports['testMD5'] = function(test) {
	test.equal(utils.md5("devochka"), "490db6b7628ee087f416f954682d0b08", "MD5 is wrong!");
	test.done();
};

// Test for encode function.
exports['testEncode'] = function(test) {
	var encoded = utils.encode({'args': ["password.txt", "superRealm", "superUser"]});
	test.equal(encoded, "superUser:superRealm:d60f8a9654592b85bfc0474dfa604906", 
			"Should be correct MD5!");
	test.done();
};