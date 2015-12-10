        var socket = io();
        $('form').submit(function(){
            socket.emit('chat message', $('#m').val());
            $('#m').val('');
            return false;
        });
        socket.on('connect', function(){
            var username = null;
            while(username == null){
                username = prompt("What's your name?");
            }
            socket.emit('adduser', username);
        });
        socket.on('chat message', function(msg){
            $('#messages').append($('<li>').text(msg));
            $('#messages').scrollTop($('#messages').height());
        });
        socket.on('user list', function(userList){
            $('#userList').empty();
            var l = userList.length;
            for(var i=0;i<l;i++){
                $('#userList').append($('<li>').text(userList[i]));
            }
        });
