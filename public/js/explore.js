var map;
var markers =[];
function initialize() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    styles: [
            {
              featureType: 'all',
              stylers: [
                { saturation: 30 }
              ]
            },{
              featureType: 'road.arterial',
              elementType: 'geometry',
              stylers: [
                { hue: '#00ffee' },
                { saturation: 50 }
              ]
            },{
              featureType: 'poi.business',
              elementType: 'labels',
              stylers: [
                { visibility: 'off' }
              ]
            }
        ],
    center: new google.maps.LatLng(40.0150,-105.2705),
    mapTypeId: 'terrain'
  });

}

    var output = $.ajax({
    url: 'https://trailapi-trailapi.p.mashape.com/?lat=39.4817&lon=-106.0384&q[activities_activity_type_name_eq]=hiking&radius=100', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
    type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
    data: {}, // Additional parameters here
    dataType: 'json',
    success: function(data) {
      //
        //Change data.source to data.something , where something is whichever part of the object you want returned.
        //To see the whole object you can output it to your browser console using:
        console.log(data.places);
        for (var i = 0; i < data.places.length; i++) {
                var lat = data.places[i].lat;
                var lon = data.places[i].lon;
                var title = data.places[i].name;
                var directions =data.places[i].directions;
                var description = data.places[i].activities[0].description;
                var pic = data.places[i].activities[0].thumbnail;
                var height;
                if(!pic){
                    height="1px";
                }else{
                    height="200px";
                }
                var marker = new google.maps.Marker({
                  position: {
                    lat: lat,
                    lng: lon,
                  },
                  map: map,
                  title:title,
                  description: description,
                  directions: directions,
                  height:height,
                  pic: pic,
                  animation:google.maps.Animation.Drop,
                  id: i,
                  icon: "../img/hiking.png"
                });
                var infoWindow = new google.maps.InfoWindow({
                });
                marker.addListener('click',function(){
                    populateInfoWindow(this, infoWindow);
                });
            };
            function populateInfoWindow(marker,infowindow){
                if(infowindow.marker != marker){
                    infowindow.marker = marker;
                    var markerHtml;
                    if(marker.pic){
                        markerHtml = '<h2 style="background-color: #1abc9c; padding:10px; color:white">' + marker.title + '</h2>'  +
                                     '<div>' + marker.description + '</div>'  +
                                     '<div>' + '<img style="height: ' + marker.height + '" src="' + marker.pic + '"/></div>' +
                                     '<h3> Directions </h3>' +
                                     '<p>' + marker.directions + '</p>';
                    }else{
                        markerHtml = '<h2 style="background-color: #1abc9c; padding:10px; color:white">' + marker.title + '</h2>'  +
                                     '<div>' + marker.description + '</div>'+
                                     '<h3 > Directions </h3>' +
                                     '<p>' + marker.directions + '</p>';
                    }
                    infowindow.setContent( markerHtml );
                    infowindow.open(map,marker);
                    infowindow.addListener('closeclick', function(){
                        console.log('hello')
                        infowindow.setMarker(null);
                    })
                }
            }
        },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
    xhr.setRequestHeader("X-Mashape-Authorization", "hyv4z0FsLumshX2kfe9SZLo8HRQYp1HEP5EjsnxXNzRcXJEJoK"); // Enter here your Mashape key
    }

});
