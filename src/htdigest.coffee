# Importing local modules.
program = require './program'
processor = require './processor'

# Parses and processes command line arguments.
program.parse process.argv
processor.process program