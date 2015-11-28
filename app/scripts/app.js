angular.module("farfromsober", ["ngRoute", "route-segment", "view-segment"]);

angular
    .module("farfromsober")
    .config(["$routeSegmentProvider", "$routeProvider", "$httpProvider", function($routeSegmentProvider,$routeProvider, $httpProvider){

        // Configuración del envío del token CSRF al backend en cada llamada http.
        $httpProvider.defaults.xsrfCookieName = "csrftoken";
        $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";

        $routeSegmentProvider.when( "/productos", "productos");

        $routeSegmentProvider.segment("productos", {
            controller: "ProductosController",
            templateUrl: "views/Productos.html",
            resolve: {
                Productos: ["APIFarFromSobersProvider", function(APIFarFromSobersProvider) {
                    return APIFarFromSobersProvider.getProductos();
                }] }
        });

        $routeSegmentProvider.when( "/findproductos", "productosWithParams");

        $routeSegmentProvider.segment("productosWithParams", {
            controller: "ProductosController",
            templateUrl: "views/Productos.html",
            dependencies: ["category","name","distance"],
            resolve: {
                Productos: ["APIFarFromSobersProvider", "$routeParams", function(APIFarFromSobersProvider,$routeParams) {
                    return APIFarFromSobersProvider.getProductoWithParam($routeParams.category, $routeParams.name, $routeParams.distance);
                }] }
        });

        $routeSegmentProvider.when( "/producto/:id", "producto");

        $routeSegmentProvider.segment("producto", {
            controller: "ProductoController",
            templateUrl: "views/Producto.html",
            resolve: {
                Producto: ["APIFarFromSobersProvider", "$routeParams", function(APIFarFromSobersProvider,$routeParams) {
                    return APIFarFromSobersProvider.getProductoById($routeParams.id);
                }] }
        });

        $routeSegmentProvider.when( "/perfil/:id/vendidos", "vendidos");

        $routeSegmentProvider.segment("vendidos", {
            controller: "PerfilVendidosController",
            templateUrl: "views/PerfilVendidos.html",
            resolve: {
                Vendidos: ["APIFarFromSobersProvider", "$routeParams", function(APIFarFromSobersProvider,$routeParams) {
                    return APIFarFromSobersProvider.getPerfilVendidosById($routeParams.id);
                }] }
        });

        $routeSegmentProvider.when( "/perfil/:id/ventas", "en_ventas" );

        $routeSegmentProvider.segment( "en_ventas", {
            controller: "PerfilEnVentasController",
            templateUrl: "views/PerfilEnVentas.html",
            resolve: {
                EnVentas: ["APIFarFromSobersProvider", "$routeParams", function(APIFarFromSobersProvider,$routeParams){
                    return APIFarFromSobersProvider.getPerfilEnVentasById($routeParams.id);
                }]
            }
        });

        $routeSegmentProvider.when( "/perfil/:id/busquedas", "busquedas" );

        $routeSegmentProvider.segment( "busquedas", {
            controller: "PerfilBusquedaController",
            templateUrl: "views/PerfilBusqueda.html",
            resolve: {
                Busquedas: ["APIFarFromSobersProvider", "$routeParams", function(APIFarFromSobersProvider,$routeParams){
                    return APIFarFromSobersProvider.getPerfilBusquedaById($routeParams.id);
                }]
            }
        });

        $routeSegmentProvider.when( "/perfil/:id/editar", "editar_perfil" );

        $routeSegmentProvider.segment( "editar_perfil", {
            controller: "PerfilEditarController",
            templateUrl: "views/PerfilEditar.html",
            resolve: {
                DatosPerfil: ["APIFarFromSobersProvider", "$routeParams", function(APIFarFromSobersProvider,$routeParams){
                    return APIFarFromSobersProvider.getPerfilEditarById($routeParams.id);
                }]
            }
        });

        $routeSegmentProvider.when( "/perfil/:id/notificaciones", "notificaciones" );

        $routeSegmentProvider.segment( "notificaciones", {
            controller: "PerfilNotificacionesController",
            templateUrl: "views/PerfilNotificaciones.html",
            resolve: {
                Notificaciones: ["APIFarFromSobersProvider", "$routeParams", function(APIFarFromSobersProvider,$routeParams){
                    return APIFarFromSobersProvider.getPerfilNotificacionesById($routeParams.id);
                }]
            }
        });

        $routeSegmentProvider.when( "/login", "login");

        $routeSegmentProvider.segment("login", {
            controller: "LoginController",
            templateUrl: "views/Login.html",
            resolve: {}
        });

        $routeSegmentProvider.when( "/registro", "registro");

        $routeSegmentProvider.segment("registro", {
            controller: "RegistroController",
            templateUrl: "views/Registro.html",
            resolve: {}
        });

        $routeSegmentProvider.when( "/vender", "vender");

        $routeSegmentProvider.segment("vender", {
            controller: "VenderController",
            templateUrl: "views/Vender.html",
            resolve: {}
        });

    }]);
