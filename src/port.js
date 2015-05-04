var EventEmitter = require('events').EventEmitter;
var util = require('util');

function Port() {
  this.constructor.apply(this, arguments);
}

util.inherits(Port, EventEmitter);

Port.prototype = {
  number: null,

  mountedProgram: null,

  constructor: function(portNumber) {
    console.log(portNumber);
    this.number = portNumber;
  },

  validateProgramMount: function(programToMount) {
    return !this.mountedProgram;
  },

  mountProgram: function(programToMount) {
    this.mountedProgram = programToMount;
    this.startMountedProgram();
  },

  startMountedProgram: function() {
    this.mountedProgram.start();
  },

  getSummary: function() {
    return {
      number: this.number,
      program: this.mountedProgram ? this.mountedProgram.type : "none"
    };
  }

};

module.exports = Port;

