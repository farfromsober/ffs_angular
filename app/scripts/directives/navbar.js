angular.module("farfromsober").directive("navbarDirective", ["$location", "AuthenticationService", "$window", function($location,  AuthenticationService, $window) {

    return {
        templateUrl: "views/templates/Navbar.html",
        /*scope: {
            userIsLoged: '@'
        },*/
        link: function (scope) {

            scope.findProducts = function (){
                var name = scope.form.inputFindProducts.$viewValue;
                var category = scope.form.selectCategoria.$viewValue;
                var distance = scope.form.selectDistancia.$viewValue;

                //Llamamos a la routesegment con los parametros a buscar
                $location.path("/findproductos").search({ category: category, name: name, distance: distance });

            };

            scope.navbarShowElements = function (data) {
                //Ocultamos el boton de Login y mostramos el perfil logeado
                //scope.userName = scope.globals.currentUser.username;
                //scope.sales = data[0].sales;
                scope.user = JSON.parse($window.sessionStorage.user);
                //scope.user = AuthenticationService.GetUser();
                scope.userName = scope.user.username;
                scope.sales = scope.user.sales;
                $location.path("/productos")
                scope.showNavbarElements=true;
            };

            scope.navbarHideElements = function () {
                //AuthenticationService.ClearCredentials();
                AuthenticationService.ClearCredentialsSessionStorage();
                $location.path("/login")
                scope.showNavbarElements=false;
            };

        }
    };
}]);
