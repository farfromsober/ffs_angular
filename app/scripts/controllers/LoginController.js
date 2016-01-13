angular
    .module("farfromsober")
    .controller("LoginController", ["$scope", "APIFarFromSobersProvider", "$rootScope", "$location", "AuthService", function($scope, APIFarFromSobersProvider, $rootScope, $location, AuthService) {

        $scope.submit = function () {
            $scope.dataLoading = true;

            APIFarFromSobersProvider.getLoginUsuario($scope.username,$scope.password, function (response) {
                if (response.status == 200) {
                    //debugger;
                    AuthService.SetCredentials($scope.username, $scope.password, response.data);
                    $location.path("/productos")
                } else {
                    // TODO: show error alert
                    /*$scope.error = "El nombre de usuario o el password introducidos son incorrectos"*/
                    $scope.dataLoading = false;
                }
            });
        };
    }]);