angular
    .module("farfromsober")
    .controller("SectionController", ["$scope", "$routeSegment", "$location", "AuthenticationService", "$window", function($scope,$routeSegment,$location, AuthenticationService, $window){

        // Arrancamos con la página de login
        $routeSegment.startsWith( "login" );

        /*$scope.savedUser = localStorage.getItem('user');
        $scope.user = (localStorage.getItem('user')!==null) ? JSON.parse($scope.savedUser) : [ {first_name: 'Not loged'}];
        localStorage.setItem('user', JSON.stringify($scope.user));

        $scope.savedShowNavBar = localStorage.getItem('showNavBar');
        $scope.showNavBarElements = (localStorage.getItem('showNavBar')!==null) ? $scope.savedShowNavBar : false;
        localStorage.setItem('showNavBar', $scope.showNavBarElements);
        */
    }]);
