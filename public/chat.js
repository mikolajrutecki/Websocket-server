//Make connection
var socket = io.connect('http://192.168.1.15:8000');
socket.send("HELLO!");