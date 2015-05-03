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

  jQuery(function($, undefined) {
    $('#terminal').terminal(function(command, term) {
      if (command !== '') {
        try {
          var result = window.eval(command);
          if (result !== undefined) {
            term.echo(new String(result));
          }
        } catch(e) {
          term.error(new String(e));
        }
      } else {
        term.echo('');
      }
    }, {
      greetings: 'Welcome to root_net! Please enjoy your stay.',
      name: 'root',
      height: 200,
      prompt: '> '});
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