ngular.module('GearShare',["ngRoute"])


angular.module('GearShare').config(function($routeProvider){
    $routeProvider.when('/home', {
        templateUrl: './views/home.html'
    });

    $routeProvider.when('/loan', {
        templateUrl: './views/loan.html'
    });
    $routeProvider.when('/rent', {
        templateUrl:'./views/rent.html'
    });
    $routeProvider.when('/near', {
        templateUrl:'./views/near.html'
    });

    $routeProvider
        .otherwise({
            redirectTo:'/home'
        });
});

angular.module('GearShare').controller('shareCtrl', ['$scope', '$location', shareCtrl])
function shareCtrl( $scope, $location ) {
    var  sCtrl = this;

    var foo = '' ;
    $scope.$on('$routeChangeSuccess', function() {
        sCtrl.locationPath = $location.path();
        console.log('locationPath: ' + sCtrl.locationPath );
    });
}

angular.module('GearShare').controller('aboutCtrl', function ($scope) {
    $scope.aboutText = 'Every page on this site is embedded inside the index.html';
});

console.log('before my new controller and factory')
