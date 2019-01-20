let express = require('express');
let socket = require('socket.io');

let request = require('request')

//App setup
let app = express();
let server = app.listen(8000, () => {
    console.log("Listening to requests on port 8000");
});

//Static files
app.use(express.static('public'));

//Socket setup
let io = socket(server);
io.on('connection', (socket) => {
    console.log("Made socket connection! ID: " + socket.id);
    socket.on('message', (data) => {
        let json = {
            // 'id': data.id,
            'phone': data.phone,
            'latitude': data.latitude,
            'longitude': data.longitude,
            'text': data.text,
            'picture': data.picture
        }
        request.post('http://localhost:8001/markers/', {
            json: json,
        }, (error, res, body) => {
            if(error){
                console.error(error);
                return
            }
            console.log('statusCode: ', res.statusCode);
            console.log(body);
            io.sockets.emit('message', body);
        });
        //io.sockets.emit('message', data);
    });
    socket.on('disconnect', () => {
        console.log("Disconnected! ID: " + socket.id);
    });
});

