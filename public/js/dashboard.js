angular.module('app.dashboard', [])
    .controller('DashboardController',  ['$scope','$http', function($scope, $http){
        var profiles = this;
            profiles.payload={};

        profiles.update = function(req){
            console.log(req);
            $http({
                method : 'POST',
                url    : '/lender',
                data   : req,
            }).then(function(responseData){
                console.log(responseData)
                profiles.user = responseData.data;

            });
        }

        $http({
            method : 'GET',
            url    : '/lender/' ,
        }).then(function(returnData){
            console.log(returnData.data)
            if (returnData.data ){
                profiles.user = returnData.data;
                profiles.payload.email = profiles.user.email;
                profiles.payload.zipCode = profiles.user.zipCode;
                profiles.payload.state = profiles.user.state;
                profiles.payload.phone = profiles.user.phone;
                profiles.payload.rate = profiles.user.rate;
                profiles.payload.typeEquipment = profiles.user.typeEquipment;
                profiles.payload.description = profiles.user.description;
                profiles.payload.profilePic = profiles.user.profilePic;
                profiles.payload.photo = profiles.user.photo;
                var arr = ['('];
                for(var i = 0; i < profiles.user.phone.length; i++){
                    if(i ===3){
                        arr.push(')');
                    }if(i ===6){
                        arr.push('-')
                    }
                        arr.push(profiles.user.phone[i])
                }
                profiles.user.phone = arr.join('');
            }
        })
    }]);
