// Import CoffeeScript.
require('coffee-script');

// Importing module.
var processor = require('../lib/processor');

// Test for process password function.
exports['testProcessPassword'] = function(test) {
	var program = {'args': ["someText.txt", "someRealm", "someUser"]};
	
	program.password = function(){
		test.done();
	};
	
	processor.process(program);
};

// Test for process help function.
exports['testProcessHelp'] = function(test) {
	var program = {'args': ["jeff", "buckley"]};
	
	program.help = function(){
		test.done();
	};
	
	processor.process(program);
};