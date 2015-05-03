var EventEmitter = require('events').EventEmitter;
var util = require('util');
var idGen = require('./id_gen');
var ActiveCommands = require('./active_commands');

var Command = function(args, sessionId) {
};

util.inherits(Command, EventEmitter);

Command.prototype.name = 'unimplemented';
Command.prototype.helpText = 'unimplemented command';

Command.prototype.makeId = function() {
  this.id = idGen(this.name, this.sessionId);
};

Command.prototype.start = function() {
  this.makeId();
  ActiveCommands.addCommand(this);
  this.run();
  return this.id;
};

Command.prototype.run = function() {
  throw new Error('run is unimplemented');
};

Command.prototype.status = function(status, response) {
  this.emit('status', {
    id: this.id,
    status: status,
    response: response
  });

  if (['success', 'failure', 'interrupt'].indexOf(status) != -1) {
    this.finished();
  }
};

Command.prototype.interrupt = function() {
  this.status('interrupt', {});
};

Command.prototype.finished = function() {
  this.emit('finished');
};

module.exports = Command;
