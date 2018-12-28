let locations = [];
let markers = [];
let map;
let infowindow;
let base64;
let url = 'http://localhost:8001/markers/';
let clickedMarkerId;

document.addEventListener("DOMContentLoaded", function(event) { 

    //API GET REQUEST
    let request = new Request(url, {
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
            let temp = [obj.id, obj.phone, obj.latitude, obj.longitude, obj.text, obj.picture];
            locations.push(temp);
            addMarker();
        }
    });

    //Connect
    let socket = io.connect('localhost:8000');

    //Listen for events
    socket.on('message',function(data){
        locations.push([data.id, data.phone, data.latitude, data.longitude, data.text, data.picture]);
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


function createMarker(latlng, content, id){
    let marker = new google.maps.Marker({
        position: latlng,
        map: map,
        id: id
    });
    google.maps.event.addListener(marker, 'click', function(){
        infowindow.setContent(content);
        infowindow.open(map, marker);
        console.log(marker.id);
        clickedMarkerId = marker.id;
    });
    return marker;
}

//adds marker to the map
function addMarker(){
    let i = locations.length - 1;
    createMarker(new google.maps.LatLng(locations[i][2], locations[i][3]), '<b>Numer zgłaszającego: ' + locations[i][1] +'</b><br>' + '<b>Treść zgłoszenia: ' 
    + locations[i][4] +'</b>' + '<br><img src="data:image/jpeg;base64,'+locations[i][5]+'"width=400 height=300</img><br>'
    +'<button type="button" class="btn btn-danger delete-marker" onclick="deleteMarker(clickedMarkerId)">Usuń marker</button>',
    locations[i][0]);
}

function deleteMarker(id){
    console.log(id);
        fetch(url + id + '/', {
            method: 'delete'
        });           
}


