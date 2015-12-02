angular
    .module("farfromsober")
    .controller("LoginController", ["$scope", "APIFarFromSobersProvider", "$rootScope", "$location", "AuthService", function($scope, APIFarFromSobersProvider, $rootScope, $location, AuthService) {

        $scope.submit = function () {
            $scope.dataLoading = true;

            APIFarFromSobersProvider.getLoginUsuario($scope.username,$scope.password, function (response) {
                if (response.status == 200) {
                    //debugger;
                    AuthService.SetCredentials($scope.username, $scope.password, response.data[0]);
                    $scope.navbarShowElements();
                } else {
                    debugger;
                    console.log(response);
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);