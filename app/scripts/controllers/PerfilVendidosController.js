angular
    .module("farfromsober")
    .controller("PerfilVendidosController",  ["$scope", '$routeParams', "Usuario", "Vendidos", function($scope, $routeParams, Usuario, Vendidos) {
        $scope.productos = Vendidos.data;
        $scope.usuario = Usuario.data;
    }]);