"use strict";

// Importing crypto module.
const crypto = require("crypto");

// Export object.
const utils = {};

// md5 function.
utils.md5 = str => {
  let hash = crypto.createHash("MD5");
  hash.update(str);

  return hash.digest("hex");
};

// encode function.
utils.encode = program => {
  // Prepare arguments.
  const realm = program.args[1];
  const username = program.args[2];
  const password = program.args[3];

  // Generate hash.
  const hash = utils.md5(`${username}:${realm}:${password}`);

  // Final result.
  return `${username}:${realm}:${hash}`;
};

// Export.
module.exports = utils;
