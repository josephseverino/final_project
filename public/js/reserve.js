var params = location.pathname.split('/')[2];
console.log(params);

angular.module('app.reserve', [])
    .controller('ReserveController',  ['$scope','$http', function($scope, $http){
        var profiles = this;

        $http({
            method : 'GET',
            url    : '/user/' + params,
        }).then(function(returnData){
            console.log(returnData.data)

            if (returnData.data ){
                profiles.user = returnData.data;
            }
        })

        window.profiles = profiles;
    }]);
