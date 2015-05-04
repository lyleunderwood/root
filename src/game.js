var EventEmitter = require('events').EventEmitter;
var util = require('util');
var idGen = require('./id_gen');
var Rig = require('./rig');
var CommandList = require('./command_list');
var extend = require('extend');

function Game(scans) {
  this.constructor.super_.apply(this, arguments);
  this.scans = scans;
  this.makeId();

  this._buildRigs();
}

util.inherits(Game, EventEmitter);

extend(Game.prototype, {
  id: null,

  scans: null,

  rigs: null,

  makeId: function() {
    this.id = idGen.apply(null, this.scans.map(function(scan) { return scan.sessionId; }));
  },

  rigById: function(id) {
    return this.rigs.filter(function(rig) { return rig.id == id; })[0];
  },

  findFoeRigs: function(friendId) {
    return this.rigs.filter(function(rig) { return rig.id != friendId;  });
  },

  _buildRigs: function() {
    this.rigs = [];

    var self = this;
    this.scans.forEach(function(scan) {
      var rig = new Rig(scan.sessionId, scan.socket);
      self.rigs.push(rig);

      rig.on('command', function(params) {
        var cmd = CommandList.buildCommand(
          params.name,
          params.arguments,
          params.sessionId,
          params.socket,
          self
        );

        params.socket.emit('commandResponse', {
          commandId: cmd.id
        });

        cmd.on('status', function(commandStatus) {
          params.socket.emit('commandStatus', {
            commandId: cmd.id,
            status: commandStatus.status,
            response: commandStatus.response
          });
        });

        cmd.start();
      });
    });
  }
});

module.exports = Game;
