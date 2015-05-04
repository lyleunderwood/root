var EventEmitter = require('events').EventEmitter;
var util = require('util');
var extend = require('extend');
var idGen = require('./id_gen');
var ActiveCommands = require('./active_commands');

function Command(args, sessionId) {
  this.constructor.super_.apply(this, arguments);

  this.sessionId = sessionId;
  this.args = args;
}

util.inherits(Command, EventEmitter);

extend(Command.prototype, {
  name: 'unimplemented',

  helpText: 'unimplemented command',

  sessionId: null,

  makeId: function() {
    this.id = idGen(this.name, this.sessionId);
  },

  start: function() {
    this.makeId();
    ActiveCommands.addCommand(this);
    this.run();
    return this.id;
  },

  run: function() {
    throw new Error('run is unimplemented');
  },

  status: function(status, response) {
    this.emit('status', {
      id: this.id,
      status: status,
      response: response
    });

    if (['success', 'failure', 'interrupt'].indexOf(status) != -1) {
      this.finished();
    }
  },

  interrupt: function() {
    this.status('interrupt', {});
  },

  finished: function() {
    this.emit('finished');
  }
});

module.exports = Command;
