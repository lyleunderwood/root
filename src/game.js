var EventEmitter = require('events').EventEmitter;
var util = require('util');
var idGen = require('./id_gen');
var Rig = require('./rig');

function Game() {
  this.constructor.apply(this, arguments);
}

util.inherits(Game, EventEmitter);

Game.prototype = {
  id: null,

  scans: null,

  rigs: null,

  constructor: function(scans) {
    this.scans = scans;
    this.makeId();

    this._buildRigs();
  },

  makeId: function() {
    this.id = idGen.apply(null, this.scans.map(function(scan) { return scan.sessionId; }));
  },

  _buildRigs: function() {
    this.rigs = [];

    var self = this;
    this.scans.forEach(function(scan) {
      self.rigs.push(new Rig(scan.sessionId, scan.socket));
    });
  }
};

module.exports = Game;
