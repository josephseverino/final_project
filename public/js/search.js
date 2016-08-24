var map;
var markers =[];
function initialize() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    styles: [
            {
              featureType: 'all',
              stylers: [
                { saturation: 20 }
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
    center: new google.maps.LatLng(39.7392,-104.9903),
    mapTypeId: 'terrain'
  });

}
// var lat = '';
// var lng = '';
// var address = 80504 ;
// geocoder.geocode( { 'address': address}, function(results, status) {
//   if (status == google.maps.GeocoderStatus.OK) {
//      lat = results[0].geometry.location.lat();
//      lng = results[0].geometry.location.lng();
//     });
//   } else {
//     alert("Geocode was not successful for the following reason: " + status);
//   }
// });
// alert('Latitude: ' + lat + ' Logitude: ' + lng);
// for (var i = 0; i < profiles.users.length; i++) {
//         var zip = profiles.users[i].zipCode;
//         var marker = new google.maps.Marker({
//           position: {
//               lat:lat,
//               lng:lng,
//           }
//           map: map,
//         });


angular.module('gear',[])

angular.module('gear')
    .controller('gearController', ['$scope','$http', function($scope, $http){
        var profiles = this;


        $http({
            method : 'GET',
            url    : '/users',
        }).then(function(returnData){
            console.log(returnData.data)
            if (returnData.data ){
                profiles.users = returnData.data;

            }
        })
    }])
