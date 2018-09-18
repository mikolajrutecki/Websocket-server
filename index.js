var express = require('express');
var socket = require('socket.io');

//App setup
var app = express();
var server = app.listen(8000, function(){
    console.log("Listening to requests on port 8000");
})

//Static files
app.use(express.static('public'));

//Socket setup
var io = socket(server);
io.on('connection', function(socket){
    console.log("Made socket connection! ID: " + socket.id);
    socket.on('message', function(data){
        console.log(data);
    });
    socket.on('disconnect', function(){
        console.log("Disconnected! ID: " + socket.id);
    });
});