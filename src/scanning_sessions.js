var GameList = require('./game_list');

function ScanningSessions() {
  this.constructor.apply(this, arguments);
}

ScanningSessions.prototype = {
  scans: null,

  constructor: function() {
    this.scans = [];

    var self = this;
    this.interval = setInterval(function() {
      self._matchScans();
    }, 2000);
  },

  addScan: function(command, socket, sessionId) {
    this.scans.push({
      command: command,
      socket: socket,
      sessionId: sessionId
    });
  },

  removeScan: function(scan) {
    var idx = this.scans.indexOf(scan);

    if (idx === -1) {
      throw new Error('Scan to remove not found with sessionId ' + scan.sessionId + '!');
    }

    this.scans.splice(idx, 1);
  },

  findScan: function(scan) {
    var idx = this.scans.indexOf();
    return idx == -1 ? null : this.scans[idx];
  },

  getScanningInfo: function() {
    return {
      activeScans: this.scans.length
    };
  },

  _matchScans: function() {
    var byTargetPlayers = {};

    this.scans.forEach(function(scan) {
      var targetPlayers = scan.command.targetPlayers;

      byTargetPlayers[targetPlayers] = byTargetPlayers[targetPlayers] || [];

      byTargetPlayers[targetPlayers].push(scan);
    });

    var matches = [];
    for (var targetPlayers in byTargetPlayers) {
      var scans = byTargetPlayers[targetPlayers];
      targetPlayers = parseInt(targetPlayers);
      var matchesForTargetPlayers = this._matchScanList(scans, targetPlayers);

      if (matchesForTargetPlayers && matchesForTargetPlayers.length) {
        matches = matches.concat(matchesForTargetPlayers);
      }
    }

    var self = this;
    matches.forEach(function(match) {
      var game = GameList.startGame(match);

      match.forEach(function(scan) {
        self.removeScan(scan);
        scan.command.matched(game);
      });
    });
  },

  _matchScanList: function(scans, targetPlayers, matches) {
    if (!matches) {
      matches = [];
    }

    if (scans.length < targetPlayers) {
      return;
    }

    var matchScans = [];

    for (var i = 0; i < targetPlayers; i++) {
      var idx = this._randForLength(scans.length);
      matchScans.push(scans[idx]);
      scans.splice(idx, 1);
    }

    matches.push(matchScans);

    this._matchScanList(scans, targetPlayers, matches);

    return matches;
  },

  _randForLength: function(length, except) {
    if (length <= 0) {
      return 0;
    }

    if (typeof except == 'undefined' || except === null) {
      except = -1;
    }

    var figure = except;

    while (figure === except) {
      figure = Math.round(Math.random() * (length - 1));
    }

    return figure;
  }
};

module.exports = new ScanningSessions();

