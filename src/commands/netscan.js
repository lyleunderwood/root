var Command = require('../command');
var util = require('util');
var ScanningSessions = require('../scanning_sessions');

var Netscan = function(args, sessionId, socket) {
  this.args = args;
  this.sessionId = sessionId;
  this.socket = socket;
  this.targetPlayers = 2;

  this.run = function() {
    console.log('running netscan for', this.sessionId);

    ScanningSessions.addScan(this, this.socket, this.sessionId);

    this.status('running', ScanningSessions.getScanningInfo());
  };

  this.matched = function(game) {
    this.status('success', {
      gameId: game.id
    });
  };
};

util.inherits(Netscan, Command);

Netscan.prototype.name = 'netscan';
Netscan.prototype.helpText = 'scan network for attack vectors';

module.exports = Netscan;
