# Importing module.
processor = require '../gensrc/processor'

# FS module.
fs = require 'fs'

module.exports =
  
  # After each test.
  tearDown: (callback) ->
    fs.unlinkSync "password.txt" if fs.existsSync "password.txt"
    callback()
    
  # Test for syncFile with file create.
  testSyncFileCreate: (test) ->
    program = {'create': true, 'args': ["password.txt", "sho", "gevorg", "loser"]}
    processor.syncFile program
    
    fileData = fs.readFileSync "password.txt", 'UTF-8'
    test.equal fileData, "gevorg:sho:c188621dd651b5d3da4d3a1d3553ebcb\n", "File data is wrong!"
    
    test.done()

  # Test for syncFile with file update.
  testSyncFileUpdate: (test) ->
    fs.writeFileSync "password.txt", "gevorg:sho:c188621dd651b5d3da4d3a1d3553ebcb\n", 'UTF-8'

    program = {'args': ["password.txt", "sho", "gevorg", "winner"]}
    processor.syncFile program
  
    fileData = fs.readFileSync "password.txt", 'UTF-8'
    test.equal fileData, "gevorg:sho:8acff7c997e8afb4831290c93db09c95\n", "File data is wrong!"
  
    test.done()
    
  # Test for syncFile with file add.
  testSyncFileAdd: (test) ->
    initData = "gevorg:sho:8acff7c997e8afb4831290c93db09c95\n"
    fs.writeFileSync "password.txt", initData, 'UTF-8'
  
    program = {'args': ["password.txt", "thegreat", "tigran", "sea"]}  
    processor.syncFile program
  
    fileData = fs.readFileSync "password.txt", 'UTF-8'
    test.equal fileData, "#{initData}tigran:thegreat:07e9e983c2c8d2c20826350dae5e72fc\n", "File data is wrong!"

    test.done()

  # Test for syncFile with file add, not existing.       
  testSyncFileAddNotExisting: (test) ->
    program = {'args': ["password.txt", "losers", "serob", "dragon"]}

    preservedLog = console.log 
    console.error = () ->      
      console.error = preservedLog 
      console.error.apply console, arguments

      test.equals arguments[0], "Cannot modify file password.txt; use '-c' to create it.", "Output is wrong!"  
  
    processor.syncFile program
    test.done()  
    
