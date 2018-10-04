let locations = [];
let markers = [];
let map;
let infowindow;

document.addEventListener("DOMContentLoaded", function(event) { 
    //Connect
    let socket = io.connect('localhost:8000');

    //Listen for events
    socket.on('message',function(data){
        locations.push([data.text,data.lat, data.lng]);
        addMarker();
        let base64 = data.image;
        let img = new Image();
        img.src = 'data:image/jpeg;base64,'+base64;
        document.body.appendChild(img);
    });
});

//initialize map
function initMap() {
    //var myLatLng = {lat: 53.123482, lng: 18.008438};
      map = new google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: new google.maps.LatLng(53.123482, 18.008438)
    });

    infowindow = new google.maps.InfoWindow();
  }


function createMarker(latlng, content){
    let marker = new google.maps.Marker({
        position: latlng,
        map: map
    });

    google.maps.event.addListener(marker, 'click', function(){
        infowindow.setContent(content);
        infowindow.open(map, marker);
    });
    return marker;
}

//adds marker to the map
function addMarker(){
    let i = locations.length - 1;
    createMarker(new google.maps.LatLng(locations[i][1], locations[i][2]), locations[i][0]);
}


