angular
    .module("farfromsober")
    .controller("SectionController",
        ["$scope", "$routeSegment", "$location", "AuthService", "$window", "$rootScope", "$http",
        function($scope, $routeSegment, $location, AuthService, $window, $rootScope, $http){

        //AuthService.ClearCredentials();

        // Arrancamos con la página de login
        $routeSegment.startsWith( "login" );

        // Creamos un watcher sobre el scope, para recuperar los datos de usuario y si hay que mostrar la navbar o no, cuando
        // refrescamos la página web.
        /*$scope.$watch(function () {
            return $scope;
        }, function () {
            //debugger;
            if (AuthService.GetUser()) {
                //debugger;
                //$rootScope.user = JSON.parse(AuthService.GetUser());
                //console.log("user: "+JSON.stringify($rootScope.user));
                //$rootScope.showNavbarElements=$window.sessionStorage.showNavBar;
                //$rootScope.globals = {};
                //$rootScope.globals.currentUser=JSON.parse($window.sessionStorage.currentUser);
                //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
            } else {
                //$rootScope.globals.currentUser = {};
                //$rootScope.user = {};
                //$rootScope.user = null;
                //$rootScope.showNavbarElements=false;
            }
        });*/

    }]);
