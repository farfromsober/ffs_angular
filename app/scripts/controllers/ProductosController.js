angular
    .module("farfromsober")
    .controller("ProductosController", ["$scope", '$routeParams', "Productos", function($scope, $routeParams, Productos) {
        //console.log("Params: "+ $routeParams);
        $scope.productos = Productos.data;
    }]);