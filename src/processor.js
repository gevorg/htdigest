"use strict";

// Utils.
const utils = require('./utils');

// FS.
const fs = require('fs');

// Prompt module.
const prompt = require('prompt');

// Export object;
const processor = {};

// Sync file function.
processor.syncFile = (program) => {
    // Read params.
    const passwordFile = program.args[0];
    const realm = program.args[1];
    const username = program.args[2];

    // Encode file data.
    const writeData = utils.encode(program);

    // Collectors.
    let found = false;
    let newLines = [];

    // Not creating file.
    if (!program.create) {
        // Check if file exists.
        if (!fs.existsSync(passwordFile)) {
            console.error(`Cannot modify file ${passwordFile}; use '-c' to create it.`);
            return
        }

        // Read lines.
        const lines = fs.readFileSync(passwordFile, 'UTF-8').split("\n");

        // Loop lines.
        lines.forEach(line => {
            if (line.indexOf(`${username}:${realm}:`) === 0) {
                found = true;
                newLines.push(writeData);
                console.log(`Changing password for user ${username} in realm ${realm}.`);
            } else {
                newLines.push(line);
            }
        });
    }

    // Adding user to existing file.
    if (!found) {
        newLines.push(writeData);
        console.log(`Adding password for user ${username} in realm ${realm}.`);
    }

    // Write data.
    fs.writeFileSync(passwordFile, newLines.join("\n") + "\n", 'UTF-8');
};

// Read password.
function readPassword(program) {
    prompt.message = "";
    prompt.delimiter = "";

    const passportOption = [{name: 'password', description: 'New password:', hidden: true}];
    const rePassportOption = [{name: 'rePassword', description: 'Re-type new password:', hidden: true}];

    // Try to read password.
    prompt.get(passportOption, (err, result) => {
        if (!err) {
            const password = result.password;
            setTimeout(function () {
                prompt.get(rePassportOption, (err, result) => {
                    if (!err && password == result.rePassword) {
                        program.args.push(password);

                        try {
                            processor.syncFile(program);
                        } catch (err) {
                            console.error(err.message);
                        }
                    } else {
                        console.error("\nPassword verification error.");
                    }
                });
            }, 50);
        } else {
            console.error("\nPassword verification error.");
        }
    });
}

// Process command.
processor.exec = (program) => {
    if (program.args.length === 3) {
        readPassword(program);
    } else {
        program.help();
    }
};

// Export.
module.exports = processor;