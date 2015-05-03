var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Port() {
  this.constructor.apply(this, arguments);
}

util.inherits(Port, EventEmitter);

Port.prototype = {
  number: null,

  constructor: function(portNumber) {
    console.log(portNumber);
    this.number = portNumber;
  }

};

module.exports = Port;

