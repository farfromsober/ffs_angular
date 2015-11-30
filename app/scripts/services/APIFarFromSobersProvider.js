angular.module("farfromsober").service("APIFarFromSobersProvider", ["$http","$filter","$q","configService", function($http,$filter,$q,configService) {

    this.getProductos = function() {

        //Utilizamos la caché para obtener los datos ahorrandonos la llamada a la API
        var config = {
            cache: true
        }
        return $http.get(configService.getURLBase() + "get/NyJpZWxQl", config);
    };

    this.getProductoWithParam = function( category, name, distance ) {

        //TODO Modificar el api al que llamamos para obetener un listado de productos
        var config = {
            cache: true
        }
        //Crear la url con los parametros que nos llegan
        return $http.get(configService.getURLBase() + "get/NyJpZWxQl", config);
    };

    this.getProductoById = function( id ) {

        console.log(id);

        var config = {
            cache: true
        }

        var promise = $q.defer();
        $http.get(configService.getURLBase() + "get/NyJpZWxQl", config).then(function (data) {
            var producto = $filter("filter")(data.data, {"_id": id})[0];
            promise.resolve(producto);
        });
        return promise.promise;
    };

    this.getPerfilVendidosById = function( id ) {
        return "";
    };

    this.getPerfilEnVentasById = function( id ) {
        return "";
    };

    this.getPerfilBusquedaById = function( id ) {
        return "";
    };

    this.getPerfilEditarById = function( id ) {
        return "";
    };

    this.getPerfilNotificacionesById = function( id ) {
        return "";
    };

    this.getLoginUsuario = function( username, password, callback) {
        //TODO Debemos añadir el user y la pass en la llamada a la api
        //return $http.get(configService.getURLBase() + "get/NJsNmZgQe");
        return $http.get(configService.getURLBase() + "get/NJsNmZgQe")
            .then(function (response) {
                //debugger;
                console.log(response);
                callback(response);
            }, function (response) {
                //debugger;
                console.log(response);
                callback(response);
            });
    };

    this.postRegistroUsuario = function( usuario ) {
        return "";
    };

    this.postVentaProducto = function( producto ) {
        return "";
    };

    this.postEditarPerfil = function( producto ) {
        return "";
    };

}]);