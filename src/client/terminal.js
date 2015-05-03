var Terminal = function(socket) {
  var that = this;

  this.socket = socket;
  this.commands = {};
  this.sessionId = '';

  this.clientCommands = {
    'help': {
      'text': function(args) {
        return '';
      },
      'dynamicText': function(div) {
        setTimeout(function() { div.html('yooo<br/>whudda'); }, 1000);
      }
    }
  };

  this.socket.on('globalState', function(res) {
    that.commands = res.commands;
    that.sessionId = res.sessionId;
  });

  $(function() {
    $('#terminal').terminal(function(cmd, term) {
        that.execute(cmd, term);
      }, {
      greetings: 'Welcome to root_net! Please enjoy your stay.',
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

};

Terminal.prototype.sendCommand = function(cmd, args) {

  this.socket.emit('command', { sessionId: this.sessionId, name: cmd, arguments: args });
};

/*
When a command is executed, a message is sent to the server. This will immediately get a response containing
the commands ID. Then, periodically, a status update will come with updated information on the command (its 
status and information specific to the command).

The command itself should connect to these status updated from the server.

In the constructor of the command, it should echo out an empty value, and for the finalize function, store the
div that will be used by the command to display its updates. Then, the command render function can be called
and and will update the html of this div. Each render function can take a 

*/