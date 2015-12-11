var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/referee', function(req, res){
  res.sendFile(__dirname + '/referee.html');
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
	
  socket.on('start', function(msg){
    socket.broadcast.emit('start', msg);
  });

  socket.on('scorehome', function(msg){
    socket.broadcast.emit('scorehome', msg);
  });

  socket.on('scoreaway', function(msg){
    socket.broadcast.emit('scoreaway', msg);
  });

  socket.on('resetgame', function(msg){
    socket.broadcast.emit('resetgame', msg);
  });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});