var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('static'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('disconnect',function(){
    });
    socket.on('adduser',function(username){
        socket.username = username;
    });
    socket.on('chat message', function(msg){
        io.emit('chat message',socket.username + ": " + msg);
    });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});

