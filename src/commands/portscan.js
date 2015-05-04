var Base = require('../command');
var util = require('util');
var extend = require('extend');

function Portscan(args, sessionId, socket, game) {
  Base.apply(this, arguments);
}

util.inherits(Portscan, Base);

extend(Portscan.prototype, {
  name: 'portscan',

  helptext: 'get status of local ports',

  run: function() {
    console.log(this.game);
  }
});

module.exports = Portscan;

