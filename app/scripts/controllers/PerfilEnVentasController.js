
angular
    .module("farfromsober")
    .controller("PerfilEnVentasController",  ["$scope", '$routeParams', "Usuario", "EnVenta", function($scope, $routeParams, Usuario, EnVenta) {
        $scope.enVenta = EnVenta;
        $scope.usuario = Usuario;

    }]);