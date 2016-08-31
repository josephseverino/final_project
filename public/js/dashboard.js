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

        profiles.delete = function(){
            console.log(profiles.user._id, 'profile user')
            $http({
                method : 'DELETE',
                url    : '/lender/' + profiles.user._id,
            }).then(function(responseData){
                console.log('delete responseData', responseData);
                profiles.user = null;
                location.replace('/login')
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
                profiles.payload.titleDescription = profiles.user.titleDescription;
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
