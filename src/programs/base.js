var EventEmitter = require('events').EventEmitter;
var util = require('util');
var extend = require('extend');

function Program() {
  this.constructor.super_.apply(this, arguments);
}

util.inherits(Program, EventEmitter);

extend(Program.prototype, {
  type: 'unimplemented',

  start: function() {
    this._started = true;
  },

  stop: function() {
    this._started = false;
  }
});

module.exports = Program;

