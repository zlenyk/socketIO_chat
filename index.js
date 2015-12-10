var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userList = [];
app.use(express.static('static'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('disconnect',function(){
        var index = userList.indexOf(socket.username);
        if(index > -1){
            userList.splice(index,1);
        }
        io.emit('user list', userList);
    });
    socket.on('adduser',function(username){
        socket.username = username;
        userList.push(username);
        io.emit('user list', userList);
    });
    socket.on('chat message', function(msg){
        io.emit('chat message',socket.username + ": " + msg);
    });
    socket.on('writing', function(msg){
        io.emit('writing',socket.username + ' is writing...');
    });
});
http.listen(3000, function(){
  console.log('change listening on *:3000');
});

