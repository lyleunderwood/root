var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var idGen = require('./id_gen');
var Command = require('./command');

var commands = {
  netscan: {
    help: "scan network for attack vectors"
  }
};

app.use(express.static('./src/client'));

io.on('connection', function(socket) {
  console.log('user connected', socket.id);
  var ip = socket.client.conn.remoteAddress;
  var sessionId = idGen(ip);

  console.log('generated new session id', sessionId);

  socket.emit('globalState', {
    commands: commands,
    serverReady: true,
    sessionId: sessionId
  });

  var command = new Command([1], sessionId);

  socket.emit('commandResponse', {
    commandId: command.id
  });

  command.on('status', function(response) {
    socket.emit('commandStatus', {
      commandId: response.id,
      status: response.status,
      response: response.response
    });
  });

  command.start();
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});