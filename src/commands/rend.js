var Base = require('../long_command');
var util = require('util');
var extend = require('extend');

function Rend(args, sessionId, socket, game) {
  Base.apply(this, arguments);
  this.rate = 0.1;
}

util.inherits(Rend, Base);

extend(Rend.prototype, {
  name: 'rend',

  helptext: 'fuck up a port',

  targetPort: null,

  run: function() {
    var portNumber = this.args.shift();
    if (!portNumber) {
      return this.status('failure', {error: 'you must specify a port number'});
    }

    portNumber = parseInt(portNumber, 10);

    if (typeof portNumber !== 'number' || isNaN(portNumber) || !isFinite(portNumber)) {
      return this.status('failure', {error: 'the port number specified is invalid'});
    }

    this.targetPort = portNumber;
  },

  onProgressDone: function() {
    Base.prototype.onProgressDone.apply(this, arguments);

    var rig = this.game.findFoeRigs(this.sessionId)[0];

    var port = rig.portByNumber(this.targetPort);

    if (port && port.mountedProgram) {
      if (port.mountedProgram.type == 'root' && false) {
        this.status('success', {message: 'hey you won okay'});
        return this.game.won(rig);
      }

      var programType = port.mountedProgram.type;
      port.unmountProgram();
      return this.status('success', {message: 'forced program to unmount: ' + programType});
    }

    return this.status('success', {message: 'nothing to rend on ' + this.targetPort});
  }
});

module.exports = Rend;

