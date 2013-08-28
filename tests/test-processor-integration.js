// Import CoffeeScript.
require('coffee-script');

// Importing module.
var processor = require('../lib/processor');

// FS module.
var fs = require('fs');

// After each test.
exports['tearDown'] = function(callback) {
	if ( fs.existsSync("password.txt") ) {
		fs.unlinkSync("password.txt");
	}
	
	callback();
};

// Test for syncFile with file create.
exports['testSyncFileCreate'] = function(test) {
	var program = {'create': true, 'args': ["password.txt", "sho", "gevorg", "loser"]};			
	processor.syncFile(program);
	
	var fileData = fs.readFileSync("password.txt", 'UTF-8');
	test.equal(fileData, "gevorg:sho:c188621dd651b5d3da4d3a1d3553ebcb\n", "File data is wrong!");
	
	test.done();
};

// Test for syncFile with file update.
exports['testSyncFileUpdate'] = function(test) {
	fs.writeFileSync("password.txt", "gevorg:sho:c188621dd651b5d3da4d3a1d3553ebcb\n", 'UTF-8');

	var program = {'args': ["password.txt", "sho", "gevorg", "winner"]};
	processor.syncFile(program);
	
	var fileData = fs.readFileSync("password.txt", 'UTF-8');
	test.equal(fileData, "gevorg:sho:8acff7c997e8afb4831290c93db09c95\n", "File data is wrong!");
	
	test.done();
};

// Test for syncFile with file add.
exports['testSyncFileAdd'] = function(test) {
	var initData = "gevorg:sho:8acff7c997e8afb4831290c93db09c95\n";
	fs.writeFileSync("password.txt", initData, 'UTF-8');
	
	var program = {'args': ["password.txt", "thegreat", "tigran", "sea"]};	
	processor.syncFile(program);
	
	var fileData = fs.readFileSync("password.txt", 'UTF-8');
	test.equal(fileData, initData + "tigran:thegreat:07e9e983c2c8d2c20826350dae5e72fc\n", 
			"File data is wrong!");
	
	test.done();
};

// Test for syncFile with file add, not existing.
exports['testSyncFileAddNotExisting'] = function(test) {
	var program = {'args': ["password.txt", "losers", "serob", "dragon"]};	

	var preservedLog = console.log;	
	console.error = function() {
		console.error = preservedLog; 
		console.error.apply(console, arguments);

		test.equals(arguments[0], "Cannot modify file password.txt; use '-c' to create it.", 
				"Output is wrong!");
	};
	
	processor.syncFile(program);
	test.done();
};