# Importing package.json for version info.
settings = require '../package.json'

# Importing commander module.
program = require 'commander'

# Setting up program.
program
  .version(settings.version)
  .usage("[options] passwordfile realm username")
  .option('-c, --create', "Create a new file.")

# Custom help.
program.on '--help', () ->
  console.log """
    Examples: 
      
      htdigest [-c] passwordfile realm username
  
  """

# Exporting program.
module.exports = program