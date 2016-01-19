angular
    .module("farfromsober")
    .controller("ProductosController", ["$scope", '$routeParams', "Productos", "LocationService",
        function($scope, $routeParams, Productos, LocationService) {
        //console.log("Params: "+ $routeParams);
        $scope.productos = Productos.data;
        // guardamos la localización por si queremos hacer búsquedas por distancia
        LocationService.saveCurrentLocation();
    }]);