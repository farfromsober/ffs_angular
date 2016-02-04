angular
    .module("farfromsober")
    .controller("SectionController",
        ["$scope", "$routeSegment", "$location", "AuthService", "$window", "$rootScope", "$http",
        function($scope, $routeSegment, $location, AuthService, $window, $rootScope, $http){
            
        // Arrancamos con la página de login
        $routeSegment.startsWith( "login" );
    }]);
