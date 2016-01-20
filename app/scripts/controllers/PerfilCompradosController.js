angular
    .module("farfromsober")
    .controller("PerfilCompradosController",  ["$scope", '$routeParams', "Usuario", "Comprados", function($scope, $routeParams, Usuario, Comprados) {
        $scope.productos = Comprados.data;
        $scope.usuario = Usuario.data;
    }]);