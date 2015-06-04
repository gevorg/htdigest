# Need utility module.
utils = require './utils'

# FS module.
fs = require 'fs'

# Prompt module.
prompt = require 'prompt'

## Module for processing command.
module.exports =
 
  # Read password.
  readPassword: (program) ->
    # Prepare prompt.
    prompt.message = ""
    prompt.delimiter = ""
    
    # Prepare options.
    options = [
      {name: 'password', description: 'New password:', hidden: true}, 
      {name: 'rePassword', description: 'Re-type new password:', hidden: true}
    ]
    
    # Try to read password.
    prompt.get options, (err, result) ->
      if not err and result.password is result.rePassword
        program.args.push result.password
        module.exports.finalize program
      else
        console.error "\nPassword verification error."
    
  # Processing command.
  process: (program) ->
    if program.args.length is 3
      module.exports.readPassword program
    else
      program.help()
            
  # Finalizes processing by printing output or changing password file. 
  finalize: (program) ->
    try
      module.exports.syncFile program
    catch error
      console.error error.message
        
  # Sync file with new data.
  syncFile: (program) ->
    passwordFile = program.args[0]
    realm = program.args[1]
    username = program.args[2]
    writeData = utils.encode program

    found = false
    newLines = []

    if not program.create
      if not fs.existsSync passwordFile
        console.error "Cannot modify file #{passwordFile}; use '-c' to create it."
        return
        
      lines = (fs.readFileSync passwordFile, 'UTF-8').split "\n"
      
      for line, i in lines
        if (line.indexOf "#{username}:#{realm}:") is 0
          found = true          
          newLines.push writeData
          console.log "Changing password for user #{username} in realm #{realm}."
        else if line # Remove empty lines.
          newLines.push line
            
    if not found # Adding user to existing file.
        newLines.push writeData
        console.log "Adding password for user #{username} in realm #{realm}."
    
    # Write data.
    fs.writeFileSync passwordFile, (newLines.join "\n") + "\n", 'UTF-8'