var EventEmitter = require('events').EventEmitter;
var util = require('util');
var idGen = require('./id_gen');

var Command = function(args, sessionId) {
  this.name = 'unimplemented';
  this.helpText = 'unimplemented command';

  this.id = idGen(this.name, sessionId);

  args = args || [];

  if (!Array.isArray(args)) {
    throw new Error('args should be an array!');
  }

  this.args = args;

  this.start = function() {
    console.log('running command with args ', this.args);
    this.emit('started', {
      status: 'running',
      id: this.id
    });

    var self = this;
    setTimeout(function() {
      self.status();
    }, 1000);

    return this.id;
  };

  this.status = function() {
    this.emit('status', {
      id: this.id,
      status: 'running',
      response: {
        stuff: true
      }
    });

    var self = this;
    setTimeout(function() {
      self.finished();
    }, 1000);
  };

  this.finished = function() {
    this.emit('status', {
      id: this.id,
      status: 'success',
      response: {
        text: 'all done yo'
      }
    });
  };

};

util.inherits(Command, EventEmitter);

module.exports = Command;
