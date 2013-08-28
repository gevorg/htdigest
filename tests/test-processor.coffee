# Importing module.
processor = require '../lib/processor'

module.exports =

  # Test for process password function.
  testProcessPassword: (test) ->
    program = {'args': ["someText.txt", "someRealm", "someUser"]}
    program.password = () ->
      test.done()  

    processor.process program

  # Test for process help function.
  testProcessHelp: (test) ->
    program = {'args': ["jeff", "buckley"]}
    program.help = () ->
      test.done()  
      
    processor.process program