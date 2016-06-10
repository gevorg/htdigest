"use strict";

// Utils.
import * as utils from './utils'

// FS.
import fs from 'fs'

// Prompt module.
import prompt from 'prompt'

// Sync file function.
export function syncFile(program) {
    // Read params.
    let passwordFile = program.args[0];
    let realm = program.args[1];
    let username = program.args[2];

    // Encode file data.
    let writeData = utils.encode(program);

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
        let lines = fs.readFileSync(passwordFile, 'UTF-8').split("\n");

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
}

// Read password.
function readPassword(program) {
    prompt.message = "";
    prompt.delimiter = "";

    let passportOption = [{name: 'password', description: 'New password:', hidden: true}];
    let rePassportOption = [{name: 'rePassword', description: 'Re-type new password:', hidden: true}];

    // Try to read password.
    prompt.get(passportOption, function (err, result) {
        if (!err) {
            let password = result.password;
            setTimeout(function () {
                prompt.get(rePassportOption, function (err, result) {
                    if (!err && password == result.rePassword) {
                        program.args.push(password);

                        try {
                            syncFile(program);
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
export function exec(program) {
    if (program.args.length === 3) {
        readPassword(program);
    } else {
        program.help();
    }
}