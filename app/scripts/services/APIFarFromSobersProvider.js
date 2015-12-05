angular.module("farfromsober")
    .service("APIFarFromSobersProvider", ["$http","$filter","$q","configService", "$rootScope", function($http,$filter,$q,configService, $rootScope) {

    this.getProductos = function() {
        debugger;
        //Utilizamos la caché para obtener los datos ahorrandonos la llamada a la API
        var config = {
            cache: true//,
            //headers: {'Authorization': 'Basic bWlndWVsYW5nZWw6MTIzNDU2'}
        };
        //return $http.get(configService.getFakeURLBase() + "get/NyJpZWxQl", config);
        //$http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
        return $http.get(configService.getURLBase() + "products/", config)
            .then(function (response) {
                debugger;
                console.log(response);
                return response;
            }, function (response) {
                debugger;
                console.log(response);
                return response;
            });
    };

    this.getProductoWithParam = function( category, name, distance ) {

        //TODO Modificar el api al que llamamos para obetener un listado de productos
        var config = {
            cache: true
        };
        //Crear la url con los parametros que nos llegan
        return $http.get(configService.getFakeURLBase() + "get/NyJpZWxQl", config)
    };

    this.getProductoById = function( id ) {

        console.log(id);

        var config = {
            cache: true
        };

        var promise = $q.defer();
        $http.get(configService.getFakeURLBase() + "get/NyJpZWxQl", config).then(function (data) {
            var producto = $filter("filter")(data.data, {"_id": id})[0];
            promise.resolve(producto);
        });
        return promise.promise;
    };


    this.getCategorias = function(){

        //Utilizamos la caché para obtener los datos ahorrandonos la llamada a la API
        var config = {
            cache: true
        };
        return $http.get(configService.getURLBase() + "get/E1BV0xy7x", config);

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

    this.getLoginUsuario = function(username, password, callback) {
        var userObject = {
            user : username,
            password : password
        };
        console.log("userObject: "+userObject);
        return $http.post(configService.getURLBase() + "login/", userObject)
            .then(function (response) {
                console.log(response);
                callback(response);
            }, function (response) {
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