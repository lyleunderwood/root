var Base = require('../command');
var util = require('util');
var extend = require('extend');

function Rend(args, sessionId, socket, game) {
  Base.apply(this, arguments);
}

util.inherits(Rend, Base);

extend(Rend.prototype, {
  name: 'rend',

  helptext: 'fuck up a port',

  run: function() {
    var portNumber = this.args.shift();
    if (!portNumber) {
      return this.status('failure', {error: 'you must specify a port number'});
    }

    portNumber = parseInt(portNumber, 10);

    if (typeof portNumber !== 'number' || isNaN(portNumber) || !isFinite(portNumber)) {
      return this.status('failure', {error: 'the port number specified is invalid'});
    }

    var rig = this.game.findFoeRigs(this.sessionId)[0];

    var port = rig.portByNumber(portNumber);

    if (port.mountedProgram && port.mountedProgram.type == 'root') {
      return this.status('success', {message: 'hey you won okay'});
    }

    this.game.won(rig);
  }
});

module.exports = Rend;

