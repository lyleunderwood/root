var Game = require('./game');

function GameList() {
  this.constructor.apply(this, arguments);
}

GameList.prototype = {
  games: null,

  constructor: function() {
    this.games = [];
  },

  startGame: function(scans) {
    return this.addGame(new Game(scans));
  },

  addGame: function(game) {
    this.games.push(game);

    var self = this;
    game.on('gameover', function() {
      self.removeGame(game);
      game.destroy();
    });

    return game;
  },

  removeGame: function(game) {
    var idx = this.games.indexOf(game);

    if (idx === -1) {
      throw new Error('Game to remove not found with id ' + game.id + '!');
    }

    this.games.splice(idx, 1);
  }
};

module.exports = new GameList();
