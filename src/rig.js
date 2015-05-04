var EventEmitter = require('events').EventEmitter;
var Port = require('./port');
var util = require('util');
var extend = require('extend');

function Rig(sessionId, socket) {
  this.constructor.super_.apply(this, arguments);

  this.id = this.sessionId = sessionId;
  this.socket = socket;

  this._buildPorts();
}

util.inherits(Rig, EventEmitter);

extend(Rig.prototype, {
  id: null,

  sessionId: null,

  socket: null,

  numberOfPorts: 5,

  ports: null,

  _setupSocket: function() {
    var self = this;
    this.socket.on('command', function(params) {
      self.emit('command', {
        sessionId: self.sessionId,
        name: params.name,
        arguments: params.arguments
      });
    });
  },

  portByNumber: function(portNumber) {
    return this.ports.filter(function(port) { return port.number == portNumber;  })[0];
  },

  _buildPorts: function() {
    this.ports = [];

    for (var i = 0; i < this.numberOfPorts; i++) {
      var currentPortNumbers = this.ports.map(function(port) { return port.number; });
      this.ports.push(new Port(this._randPortNumber(currentPortNumbers)));
    }
  },

  _randPortNumber: function(except) {
    if (!except || !except.length) {
      except = [1024];
    }

    var num = except[0];

    while (except.indexOf(num) !== -1) {
      num = Math.round(Math.random() * 2048) + 1025;
    }

    return num;
  },

  destroy: function() {
    if (this.socket) {
      this.socket.removeAllListeners('command');
    }

    this.removeAllListeners();
  }
});

module.exports = Rig;
