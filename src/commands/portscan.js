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
    var rig;

    if (this.args.indexOf('foe') !== -1) {
      rig = this.game.findFoeRigs(this.sessionId)[0];
    } else {
      rig = this.game.rigById(this.sessionId);
    }

    var ports = rig.ports.map(function(port) { return port.getSummary(); });
    this.status('success', {ports: ports});
  }
});

module.exports = Portscan;

