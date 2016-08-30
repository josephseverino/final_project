var params = location.pathname.split('/')[2];
console.log(params);

angular.module('app.reserve', [])
    .controller('ReserveController',  ['$scope','$http', function($scope, $http){
        var profiles = this;

        $http({
            method : 'GET',
            url    : '/users',
        }).then(function(returnData){
            // console.log(returnData.data._id)
            for(var i = 0; i < returnData.data.length; i++){
                if(returnData.data[i]._id === params){
                    console.log(returnData.data[i]);
                    profiles.user = returnData.data[i];
                }
            }

                console.log(profiles.user)
                profiles.user.makeAddress = function(){
                    var address = [];
                    address[0] = profiles.user.zipCode.toString();

                    profiles.geocoder.geocode({'address': address[0]}, function(results, status){
                        if(status === google.maps.GeocoderStatus.OK) {
                            profiles.map.setCenter(results[0].geometry.location);
                            var marker = new google.maps.Marker({
                                map: profiles.map,
                                position: results[0].geometry.location,
                                icon: '../img/pin.png'
                            });
                            console.log(results[0]);
                        }
                    });
                    console.log(address);
                }

                profiles.map = new google.maps.Map(document.getElementById("map"), {
                    zoom:8,
                    center: {lat: 39.7392, lng: -104.9903},
                    mapTypeId: 'terrain',

                });
                profiles.geocoder = new google.maps.Geocoder();
                profiles.user.makeAddress();

        })

        // window.profiles = profiles;
    }]);
