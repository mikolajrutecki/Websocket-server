
function initMap() {
    //var myLatLng = {lat: 53.123482, lng: 18.008438};
    var locations = [
        ['Bydgoszcz', 53.123482, 18.008438],
        ['Zielonka', 53.063090, 17.943130],
        ['Białe Błota', 53.096320, 17.919540],
        ['Przyłęki', 53.041000, 17.969310]
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: new google.maps.LatLng(53.123482, 18.008438)
    });

    for(i = 0; i < locations.length; i++){
        var ul = document.getElementById("list");
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(locations[i][0]));
        ul.appendChild(li);
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map
        });
    }
  }

document.addEventListener("DOMContentLoaded", function(event) { 
    //Connect
    var socket = io.connect('localhost:8000');
    //QueryDOM
    var output = document.getElementById('output');

    //Listen for events
    socket.on('message',function(data){
        output.innerHTML += data.text;
        var base64 = data.image;
        var img = new Image();
        img.src = 'data:image/jpeg;base64,'+base64;
        document.body.appendChild(img);

    });
});
