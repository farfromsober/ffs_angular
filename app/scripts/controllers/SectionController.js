angular
    .module("farfromsober")
    .controller("SectionController", ["$scope", "$routeSegment", "$location", "AuthService", "$window", "$rootScope", function($scope, $routeSegment, $location, AuthService, $window, $rootScope){

        // Arrancamos con la página de login
        $routeSegment.startsWith( "login" );

        // Creamos un watcher sobre el scope, para recuperar los datos de usuario y si hay que mostrar la navbar o no, cuando
        // refrescamos la página web.
        $scope.$watch(function () {
            return $scope;
        }, function () {
            if (AuthService.GetUser()) {
                $rootScope.user = JSON.parse(AuthService.GetUser());
                $rootScope.showNavbarElements=$window.sessionStorage.showNavBar;
            } else {
                $rootScope.user = {};
                $rootScope.user = null;
                $rootScope.showNavbarElements=false;
            }
        });

    }]);
