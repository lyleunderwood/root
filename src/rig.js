var EventEmitter = require('events').EventEmitter;
var Port = require('./port');
var util = require('util');

function Rig() {
  this.constructor.apply(this, arguments);
}

util.inherits(Rig, EventEmitter);

Rig.prototype = {
  id: null,

  sessionId: null,

  socket: null,

  numberOfPorts: 5,

  ports: null,

  constructor: function(sessionId, socket) {
    this.id = this.sessionId = sessionId;
    this.socket = socket;

    this._buildPorts();
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
  }
};

module.exports = Rig;
