angular
    .module("farfromsober")
    .controller("SectionController", ["$scope", "$routeSegment", "$location", "AuthenticationService", function($scope,$routeSegment,$location, AuthenticationService){

        // Arrancamos con la página de login
        $routeSegment.startsWith( "login" );
        //$scope.user = AuthenticationService.GetUser();
        //$scope.mySessionStorage = webStorage.session;

        $scope.$watch(function () {
            return AuthenticationService.GetUser();
        }, function (newVal, oldVal) {
            console.log("User storage: "+newVal);
            $scope.user = newVal;
        }, true);
    }]);
