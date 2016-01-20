angular
    .module("farfromsober")
    .controller("PerfilEnVentaController",  ["$scope", '$routeParams', "Usuario", "EnVenta", function($scope, $routeParams, Usuario, EnVenta) {
        $scope.productos = EnVenta.data;
        $scope.usuario = Usuario.data;

    }]);