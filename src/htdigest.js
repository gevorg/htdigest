'use strict';

// Importing modules.
const program = require('commander');
const processor = require('./processor');

// Parses and processes command line arguments.
module.exports = (version, args) => {
    // Setup.
    program
        .version(version)
        .usage("[options] passwordfile realm username")
        .option('-c, --create', "Create a new file.");

    // Help option.
    program.on('--help', () => {
        console.log(` 
            Examples: 
            
                htdigest [-c] passwordfile realm username    

        `);
    });

    // Parse options.
    program.parse(args);

    // Process program output.
    processor.exec(program);
};