var Terminal = function(socket) {
  var that = this;

  this.socket = socket;
  this.commands = {};
  this.sessionId = '';
  this.currentCommand = null;

  //this will be a list of display command objects
  this.clientCommands = {
    'help': function(args) {
      return 'You have been helped. Thank you.';
    }
  };

  this.socket.on('globalState', function(res) {
    that.commands = res.commands;
    that.sessionId = res.sessionId;
  });

  this.socket.on('commandResponse', function(res) {
  });

  this.socket.on('commandStatus', function(res) {
    if(!!that.currentCommand) {
      currentCommand.render(res);
    }
  });

  $(function() {
    $('#terminal').terminal(function(cmd, term) {
        that.execute(cmd, term);
      }, {
      greetings: 'Welcome to root_net! Please enjoy the stay ヽ(･ω･ゞ)',
      name: 'root',
      height: 500,
      prompt: '> '
      }
    );
  });
};

Terminal.prototype.execute = function(input, term) {
  var args = input.split(' ');
  var cmd = args.shift();

  //handle client side commands
  if(this.clientCommands.hasOwnProperty(cmd)) {
    term.echo(this.clientCommands[cmd].text.apply(this, args),
      { finalize: this.clientCommands[cmd].dynamicText,
        raw: true
      }
    );

    return;
  }

  this.sendCommand(cmd, args);
  this.currentCommand = new CommandDisplay(cmd, term);
  this.currentCommand.render(null);
};

Terminal.prototype.sendCommand = function(cmd, args) {
  this.socket.emit('command', { sessionId: this.sessionId, name: cmd, arguments: args });
};
