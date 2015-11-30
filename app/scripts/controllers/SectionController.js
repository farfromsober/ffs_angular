angular
    .module("farfromsober")
    .controller("SectionController", ["$scope", "$routeSegment", "$location", "AuthenticationService", function($scope,$routeSegment,$location, AuthenticationService){

        // Arrancamos con la página de login
        $routeSegment.startsWith( "login" );
        $scope.user = AuthenticationService.GetUser();
    }]);
