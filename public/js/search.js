angular.module('gear',[])

angular.module('gear')
    .controller('gearController', ['$scope','$http', function($scope, $http){
        var profiles = this;
        profiles.sortPrice = "";
        profiles.filter = {};
        profiles.filterByCategory = filterByCategory;
        function filterByCategory(equipment) {
            console.log(profiles);
            return profiles.filter[equipment.typeEquipment] || noFilter(profiles.filter);
        }

        function noFilter(filterObj){
            return Object.keys(filterObj).every(function (key) { return !( filterObj[key] ); });

        }
        $http({
            method : 'GET',
            url    : '/users',
        }).then(function(returnData){
            // console.log(returnData.data)
            if (returnData.data ){
                profiles.users = returnData.data;

                profiles.makeAddress = function(){
                    var address = [];
                    for(var i = 0; i < profiles.users.length; i++ ){
                        address.push(profiles.users[i].zipCode).toString();

                    }
                    for(var i = 0; i < address.length; i++ ){
                        profiles.geocoder.geocode({'address': address[i]}, function(results, status){
                            if(status === google.maps.GeocoderStatus.OK) {
                                profiles.map.setCenter(results[0].geometry.location);
                                var marker = new google.maps.Marker({
                                    map: profiles.map,
                                    position: results[0].geometry.location,
                                    icon: '../img/pin.png'
                                });
                                // console.log(results[0]);
                            }
                        });
                        // console.log(address);
                    }
                }
                profiles.map = new google.maps.Map(document.getElementById("map"), {
                    zoom:8,
                    center: {lat: 39.7392, lng: -104.9903},
                    mapTypeId: 'terrain',

                });
                profiles.geocoder = new google.maps.Geocoder();
                profiles.makeAddress();
            }
        })
    }])
