angular
    .module("farfromsober")
    .controller("ProductoController", ["$scope", "Producto", function($scope, Producto) {
        console.log(Producto);
        $scope.producto = Producto;

        $scope.selectedImage = Producto.images[0];

        $scope.changeImage = function(n){
            $scope.selectedImage = Producto.images[n]
        }


    }]);