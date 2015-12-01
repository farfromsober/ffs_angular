angular
    .module("farfromsober")
    .controller("ProductosController", ["$scope", '$routeParams', "Productos", "AuthenticationService", function($scope, $routeParams, Productos, AuthenticationService) {
        //console.log("Params: "+ $routeParams);
        $scope.productos = Productos.data;
    }]);