var Command = require('../command');
var util = require('util');

var Netscan = function(args, sessionId) {
  this.args = args;
  this.sessionId = sessionId;

  this.run = function() {
    console.log('running netscan for', this.sessionId);

    this.status('success', {
      playerList: [1]
    });

    this.finished();
  };
};

util.inherits(Netscan, Command);

Netscan.prototype.name = 'netscan';
Netscan.prototype.helpText = 'scan network for attack vectors';

module.exports = Netscan;
