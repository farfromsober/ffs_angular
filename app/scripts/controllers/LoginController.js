angular
    .module("farfromsober")
    .controller("LoginController", ["$scope", "APIFarFromSobersProvider", function($scope, APIFarFromSobersProvider) {

        $scope.submit = function() {
            console.log($scope.user + $scope.pass);

            APIFarFromSobersProvider.getLoginUsuario($scope.user,$scope.pass)
                .then(function(response) {
                    //Salimos de la promise para poder llamar a la directiva
                    $scope.callDirectiveToHide(response.data);
                }, function(response) {
                    console.log(response);
                });


        }

        $scope.callDirectiveToHide = function(data) {
            //Llamamos al método de la directica nabvar
            this.hideLoginIcons(data);
        }


    }]);