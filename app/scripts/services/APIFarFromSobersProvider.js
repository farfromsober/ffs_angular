angular.module("farfromsober").service("APIFarFromSobersProvider", function($http,$filter,$q) {

    this.getProductos = function() {
        //var productos = ["1","2","3","4","5","6"];
        return $http.get("http://beta.json-generator.com/api/json/get/NyJpZWxQl");
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

    this.getLoginUsuario = function( id ) {
        return "";
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