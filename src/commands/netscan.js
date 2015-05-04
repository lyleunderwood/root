var Command = require('../command');
var util = require('util');
var extend = require('extend');
var ScanningSessions = require('../scanning_sessions');

var Netscan = function(args, sessionId, socket, game) {
  Command.apply(this, arguments);

  this.run = function() {
    console.log('running netscan for', this.sessionId);

    ScanningSessions.addScan(this, this.socket, this.sessionId);

    this.status('running', ScanningSessions.getScanningInfo());
  };

  this.matched = function(game) {
    this.status('success', {
      gameId: game.id,
      foes: game.findFoeRigs(this.sessionId).map(function(rig) {
        return rig.getFoeSummary();
      })
    });
  };
};

util.inherits(Netscan, Command);

extend(Netscan.prototype, {
  targetPlayers: 2,
  name: 'netscan',
  helpText: 'scan network for attack vectors'
});

module.exports = Netscan;
