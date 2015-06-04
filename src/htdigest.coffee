# Importing local modules.
program = require './program'
processor = require './processor'

if (require.main == module )
  # Parses and processes command line arguments.
	program.parse process.argv
	processor.process program