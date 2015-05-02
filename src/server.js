var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var idGen = require('./id_gen');

var commands = {
  netscan: {
    help: "scan network for attack vectors"
  }
};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

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
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});