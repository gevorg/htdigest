# Need utility module.
utils = require './utils'

# FS module.
fs = require 'fs'

## Module for processing command.
module.exports =
 
  # Processing command.
  process: (program) ->
    if program.args.length is 3
      # Try to read password.
      program.password 'New password: ', (password1) ->
        program.password 'Re-type new password: ', (password2) ->
          if password1 is password2
            program.args.push password2
            module.exports.finalize program
          else
            console.error "Password verification error."
          process.stdin.destroy()
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