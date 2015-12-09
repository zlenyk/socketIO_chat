        var socket = io();
        var username = null;
        while(username == null){
            username = prompt("What's your name?");
        }
        $('form').submit(function(){
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            return false;
        });
        socket.on('connect', function(){
            socket.emit('adduser', prompt("What's your name?"));
        });
        socket.on('chat message', function(msg){
            $('#messages').append($('<li>').text(msg));
        });
