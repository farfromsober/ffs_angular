angular
    .module("farfromsober")
    .controller("LoginController", ["$scope", "APIFarFromSobersProvider", "$rootScope", "$location", "AuthenticationService", function($scope, APIFarFromSobersProvider, $rootScope, $location, AuthenticationService) {

        //AuthenticationService.ClearCredentials();

        $scope.submit = function () {
            $scope.dataLoading = true;
            /*AuthenticationService.Login($scope.username, $scope.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $scope.navbarShowElements(response.data);
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });*/

            APIFarFromSobersProvider.getLoginUsuario($scope.username,$scope.password, function (response) {
                if (response.status == 200) {
                    //debugger;
                    //AuthenticationService.SetCredentials($scope.username, $scope.password);
                    //AuthenticationService.SetCredentialsSessionStorage($scope.username, $scope.password);
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