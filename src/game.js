var EventEmitter = require('events').EventEmitter;
var util = require('util');
var idGen = require('./id_gen');

function Game() {
  this.constructor.apply(this, arguments);
}

util.inherits(Game, EventEmitter);

Game.prototype = {
  id: null,

  // object where keys are sessionIds and values are sockets
  scans: null,

  constructor: function(scans) {
    this.scans = scans;
    this.makeId();
  },

  makeId: function() {
    this.id = idGen.apply(null, this.scans.map(function(scan) { return scan.sessionId; }));
  }
};

module.exports = Game;
