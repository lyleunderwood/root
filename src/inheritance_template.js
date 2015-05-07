var Command = require('./command');
var util = require('util');
var extend = require('extend');

function LongCommand() {
  Command.apply(this, arguments);
}

util.inherits(LongCommand, Command);

extend(LongCommand.prototype, {
  
});

module.exports = LongCommand;
