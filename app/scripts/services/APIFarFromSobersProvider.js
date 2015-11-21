angular.module("farfromsober").service("APIFarFromSobersProvider", function($http,$filter,$q) {

    this.getProductos = function() {

        //Utilizamos la caché para obtener los datos ahorrandonos la llamada a la API
        var config = {
            cache: true
        }
        return $http.get("http://beta.json-generator.com/api/json/get/NyJpZWxQl", config);
    };

    this.getProductoWithParam = function( category, name, distance ) {

        //Modificar el api al que llamamos para obetener un listado de productos
        var config = {
            cache: true
        }
        //Crear la url con los parametros que nos llegan
        return $http.get("http://beta.json-generator.com/api/json/get/NyJpZWxQl", config);
    };

    this.getProductoById = function( id ) {
        return "";
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

    this.getLoginUsuario = function( user, pass ) {
        //Debemos añadir el user y la pass en la llamada a la api
        return $http.get("http://beta.json-generator.com/api/json/get/NJsNmZgQe");
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

});