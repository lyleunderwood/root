var CommandList = function() {
  this._commands = {};

  this.addCommand = function(name, obj) {
    if (this._commands[name]) {
      throw new Error('attempted to add a command (' + name + ') which already exists!');
    }

    this._commands[name] = obj;
  };

  this.getCommand = function(name) {
    if (!this._commands[name]) {
      throw new Error('no cammand found called ' + name + '!');
    }

    return this._commands[name];
  };
};

module.exports = new CommandList();
