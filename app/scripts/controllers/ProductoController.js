angular
    .module("farfromsober")
    .controller("ProductoController", ["$scope", "Producto", function($scope, Producto) {
        console.log(Producto);
        $scope.producto = Producto;

    }]);