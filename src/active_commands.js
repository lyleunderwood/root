function ActiveCommands() {
  this.constructor.apply(this, arguments);
}

ActiveCommands.prototype = {
  commands: null,

  constructor: function() {
    this.commands = [];
  },

  addCommand: function(command) {
    this.commands.push(command);

    var self = this;
    command.on('finished', function() {
      self.removeCommand(command);
    });
  },

  removeCommand: function(command) {
    var idx = this.commands.indexOf(command);

    if (idx === -1) {
      throw new Error('Command to remove not found with id ' + command.id + '!');
    }

    this.commands.splice(idx, 1);
  },

  findCommand: function(command) {
    var idx = this.commands.indexOf(command);
    return idx == -1 ? null : this.commands[idx];
  }
};

module.exports = new ActiveCommands();
