angular.module("farfromsober").directive("navbarDirective", ["$location", "AuthenticationService", function($location,  AuthenticationService) {

    return {
        templateUrl: "views/templates/Navbar.html",
        /*scope: {
            userIsLoged: '@'
        },*/
        link: function (scope) {
            //userLoged = false;

            scope.findProducts = function (){
                var name = scope.form.inputFindProducts.$viewValue;
                var category = scope.form.selectCategoria.$viewValue;
                var distance = scope.form.selectDistancia.$viewValue;

                //Llamamos a la routesegment con los parametros a buscar
                $location.path("/findproductos").search({ category: category, name: name, distance: distance });

            };

            scope.navbarShowElements = function (data) {
                //Ocultamos el boton de Login y mostramos el perfil logueado
                //scope.userName = data.username;
                //scope.sales = data[0].sales;
                $location.path("/productos")
                scope.showNavbarElements=true;
            };

            scope.navbarHideElements = function () {
                AuthenticationService.ClearCredentials();
                $location.path("/login")
                scope.showNavbarElements=false;
            };

        }
    };
}]);
