angular.module('app.reserve', [])
    .controller('ReserveController',  ['$scope','$http', function($scope, $http){
        var profiles = this;
            profiles.payload={};

        $http({
            method : 'GET',
            url    : '/reserve',
        }).then(function(returnData){
            console.log(returnData.data)
            if (returnData.data ){
                profiles.user = returnData.data;
                profiles.payload.email = profiles.user.user.email;
                profiles.payload.zipCode = profiles.user.user.zipCode;
                profiles.payload.state = profiles.user.user.state;
                profiles.payload.phone = profiles.user.user.phone;
                profiles.payload.rate = profiles.user.user.rate;
                profiles.payload.typeEquipment = profiles.user.user.typeEquipment;
                profiles.payload.description = profiles.user.user.description;
                profiles.payload.profilePic = profiles.user.user.profilePic;
                profiles.payload.photo = profiles.user.user.photo;
                var arr = ['('];
                for(var i = 0; i < profiles.user.user.phone.length; i++){
                    if(i ===3){
                        arr.push(')');
                    }if(i ===6){
                        arr.push('-')
                    }
                        arr.push(profiles.user.user.phone[i])
                }
                profiles.user.user.phone = arr.join('');
            }
        })
    }]);
