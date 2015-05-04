var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Program() {
  this.constructor.apply(this, arguments);
}

util.inherits(Program, EventEmitter);

Program.prototype = {
  type: 'unimplemented',

  constructor: function() {
  },

  start: function() {
    this._started = true;
  },

  stop: function() {
    this._started = false;
  }
};

module.exports = Program;

