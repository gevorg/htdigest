'use strict';

// Importing local modules.
import program from 'commander'
import * as processor from './processor'

// Parses and processes command line arguments.
export default function(version, args) {
    // Setup.
    program
        .version(version)
        .usage("[options] passwordfile realm username")
        .option('-c, --create', "Create a new file.");

    // Help option.
    program.on('--help', function () {
        console.log(` 
            Examples: 
            
                htdigest [-c] passwordfile realm username    

        `);
    });

    // Parse options.
    program.parse(args);

    // Process program output.
    processor.exec(program);
}