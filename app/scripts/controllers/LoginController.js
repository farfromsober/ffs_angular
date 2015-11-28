angular
    .module("farfromsober")
    .controller("LoginController", ["$scope", "APIFarFromSobersProvider", "$rootScope", "$location", "AuthenticationService", function($scope, APIFarFromSobersProvider, $rootScope, $location, AuthenticationService) {

        AuthenticationService.ClearCredentials();

        /*$scope.submit = function() {
            $scope.dataLoading = true;
            console.log($scope.username + $scope.password);

            APIFarFromSobersProvider.getLoginUsuario($scope.username,$scope.password)
                .then(function(response) {
                    //Salimos de la promise para poder llamar a la directiva
                    $scope.callDirectiveToHide(response.data);
                }, function(response) {
                    console.log(response);
                });


        }*/

        $scope.submit = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function (response) {
                if (response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $scope.callDirectiveToHide(response.data);
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };

        $scope.callDirectiveToHide = function(data) {
            //Llamamos al método de la directica nabvar
            this.hideLoginIcons(data);
        }


    }]);