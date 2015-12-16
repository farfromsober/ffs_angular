angular
    .module("farfromsober")
    .controller("ProductosController", ["$scope", '$routeParams', "Productos", "MessagesForUser", function($scope, $routeParams, Productos, MessagesForUser) {
        //console.log("Params: "+ $routeParams);
        $scope.productos = Productos.data;
        $scope.successMessage = MessagesForUser.getSuccessMessage();
        $scope.errorMessage = MessagesForUser.getErrorMessage();
        //debugger;
        if ($scope.successMessage != "" && $scope.successMessage != null) {
            $scope.onSuccessMessage = true;
            setTimeout(function () {
                $scope.$apply(function() {
                    $scope.onSuccessMessage = false;
                    MessagesForUser.setSuccessMessage();
                });
            }, 3000);
        }
        if ($scope.errorMessage != "" && $scope.errorMessage != null) {
            $scope.onErrorMessage = true;
            setTimeout(function () {
                $scope.$apply(function() {
                    $scope.onErrorMessage = false;
                    MessagesForUser.setErrorMessage();
                });
            }, 3000);
        }
    }]);