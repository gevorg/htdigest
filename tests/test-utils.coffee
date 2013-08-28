# Importing module.
utils = require '../lib/utils'

module.exports =
 
  # Test for md5 function.
  testMD5: (test) ->
    test.equal (utils.md5 "devochka"), "490db6b7628ee087f416f954682d0b08", "MD5 is wrong!"
    test.done()

  # Test for encode function.    
  testEncode: (test) ->
    encoded = utils.encode {'args': ["password.txt", "superRealm", "superUser"]}
    test.equal encoded, "superUser:superRealm:d60f8a9654592b85bfc0474dfa604906", "Should be correct MD5!"
    test.done()