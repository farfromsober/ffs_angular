angular
    .module("farfromsober")
    .controller("ProductosController", ["$scope", "Productos", function($scope, Productos) {

        $scope.productos = Productos.data;
        
    }]);