var CommandList = function() {
  this._commands = {};

  this.addCommand = function(name, obj) {
    if (this._commands[name]) {
      throw new Error('attempted to add a command (' + name + ') which already exists!');
    }

    this._commands[name] = obj;
  };

  this.addCommands = function() {
    var self = this;
    [].concat.apply([], arguments).forEach(function(cmd) {
      self.addCommand(cmd.prototype.name, cmd);
    });
  };

  this.getCommand = function(name) {
    if (!this._commands[name]) {
      throw new Error('no command found called ' + name + '!');
    }

    return this._commands[name];
  };

  this.buildCommand = function(name, args, sessionId, socket, game) {
    return new (this.getCommand(name))(args, sessionId, socket, game);
  };
};

module.exports = new CommandList();
