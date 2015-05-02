var Terminal = function(socket) {
  var that = this;

  this.socket = socket;
  this.commands = {};
  this.sessionId = '';

  this.clientCommands = {
  };

  this.socket.on('globalState', function(res) {
    that.commands = res.commands;
    that.sessionId = res.sessionId;
  });

};

Terminal.prototype.execute = function(input) {
  var args = input.split(' ');
  var cmd = args.shift();

  if(args.length === 0) {
    return;
  }

  //handle client side commands
  if(this.clientCommands.hasOwnProperty(args[0])) {
    this.clientCommands[cmd].apply(this, args);
    return;
  }

  this.sendCommand(cmd, args);

};

Terminal.prototype.sendCommand = function(cmd, args) {
  this.socket.emit('command', { sessionId: this.sessionId, name: cmd, arguments: args });
};