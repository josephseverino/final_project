angular.module('app.dashboard', [])
    .controller('DashboardController',  ['$scope','$http', function($scope, $http){
        var profiles = this;


        $http({
            method : 'GET',
            url    : '/user',
        }).then(function(returnData){
            console.log(returnData.data)
            if (returnData.data ){
                profiles.user = returnData.data;
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
    }])
