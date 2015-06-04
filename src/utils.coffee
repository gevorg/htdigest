# Importing crypto module.
crypto = require 'crypto'

#  Module for utility functionalities.
module.exports =
  
  # MD5 hash.
  md5: (str) ->
    hash = crypto.createHash 'MD5'
    hash.update str
    hash.digest 'hex'
    
  # Encoding program digest.
  encode: (program) ->
    passwordFile = program.args[0]
    realm = program.args[1]
    username = program.args[2]
    password = program.args[3]
    
    "#{username}:#{realm}:" + @md5 "#{username}:#{realm}:#{password}"
