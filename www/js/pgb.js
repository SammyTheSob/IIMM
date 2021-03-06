google.maps.event.addDomListener(window, 'load', getLocation);
function getLocation(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError, { timeout: 30000 });    
}

var lat = "";
var lng = "";
var map = "";

function onSuccess(position) {
    var latGM=position.coords.latitude;
    var langGM=position.coords.longitude;
    //Google Maps
    var myLatlng = new google.maps.LatLng(latGM,langGM);
    var mapOptions = {zoom: 14, center: myLatlng}
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	google.maps.event.addListenerOnce(map, 'tilesloaded', function(){
	readFb();
	});

	var onClick = map.addListener('mousedown', function(e) {
    var markerd = placeMarker(e.latLng, map);
      google.maps.event.removeListener(onClick);
   });
}

function onError(error) {
    alert('code: ' + error.code + '\n' +'message: ' + error.message + '\n');
}

function returnLat(){
	return lat;
}

function returnLng(){
	return lng;
}

function returnMap(){
	return map;
}

var marker = "";
function placeMarker(position, map) {
    marker = new google.maps.Marker({
        position: position,
		map: map
    });
	marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green.png');
	lat = marker.getPosition().lat();
	lng = marker.getPosition().lng();
    map.panTo(position);
	return marker;
}

function removeM() {
	marker.setMap(null);
	marker = "";
	var onClick = map.addListener('mousedown', function(e) {
    var markerd = placeMarker(e.latLng, map);
      google.maps.event.removeListener(onClick);
   });
}
