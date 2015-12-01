angular
    .module("farfromsober")
    .controller("LoginController", ["$scope", "APIFarFromSobersProvider", "$rootScope", "$location", "AuthenticationService", function($scope, APIFarFromSobersProvider, $rootScope, $location, AuthenticationService) {

        //AuthenticationService.ClearCredentials();

        $scope.submit = function () {
            $scope.dataLoading = true;

            APIFarFromSobersProvider.getLoginUsuario($scope.username,$scope.password, function (response) {
                if (response.status == 200) {
                    //debugger;
                    AuthenticationService.SetCredentialsSessionStorage($scope.username, $scope.password, response.data[0]);
                    $scope.navbarShowElements(response.data);
                } else {
                    debugger;
                    console.log(response);
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };
    }]);