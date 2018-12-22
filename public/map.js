let locations = [];
let markers = [];
let map;
let infowindow;
let base64;

document.addEventListener("DOMContentLoaded", function(event) { 

    //API GET REQUEST
    let request = new Request('http://localhost:8001/markers/', {
        method: 'GET',
        mode: 'cors',
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });

    fetch(request)
    .then(function(response) {
        return response.json();
    })
    .then(function(myJson){
        for(let i = 0; i < myJson.length; i++){
            let obj = myJson[i];
            for(let key in obj){
                let attrName = key;
                let attrValue = obj[key]
                console.log(attrName + ":" + attrValue);
            }
        }
    });


    //Connect
    let socket = io.connect('localhost:8000');

    //Listen for events
    socket.on('message',function(data){
        base64 = data.image;
        locations.push([data.text, data.lat, data.lng]);
        addMarker();
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
    createMarker(new google.maps.LatLng(locations[i][1], locations[i][2]), '<b>' + locations[i][0] +'</b>' + '<br><img src="data:image/jpeg;base64,'+base64+'"width=400 height=300</img>');
}


