"use strict";

// Importing crypto module.
import crypto from 'crypto'

// md5 function.
export function md5(str) {
    let hash = crypto.createHash('MD5');
    hash.update(str);

    return hash.digest('hex');
}

// encode function.
export function encode(program) {
    // Prepare arguments.
    let realm = program.args[1];
    let username = program.args[2];
    let password = program.args[3];

    // Generate hash.
    let hash = md5(`${username}:${realm}:${password}`);

    // Final result.
    return `${username}:${realm}:${hash}`;
}