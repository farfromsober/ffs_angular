angular
    .module("farfromsober")
    .directive("navbarDirective", ["$location", "AuthenticationService", "$window", function($location,  AuthenticationService, $window) {

    return {
        templateUrl: "views/templates/Navbar.html",
        /*scope: {
            userIsLoged: '@'
        },*/
        link: function (scope, element, attrs) {

            scope.findProducts = function (){
                var name = scope.form.inputFindProducts.$viewValue;
                var category = scope.form.selectCategoria.$viewValue;
                var distance = scope.form.selectDistancia.$viewValue;

                //Llamamos a la routesegment con los parametros a buscar
                $location.path("/findproductos").search({ category: category, name: name, distance: distance });

            };

            /*scope.$location = location;
            scope.$watch('$location.path()', function(locationPath) {
                (locationPath == "/login") ? scope.showNavbarElements=false : scope.showNavbarElements=true;
                debugger;
            });*/

            scope.$watch(function () {
                return $location.path();
            }, function (locationPath) {
                //debugger;
                scope.user = JSON.parse(AuthenticationService.GetUser());
                console.log("LocationPath: "+locationPath);
                if (locationPath == null || locationPath == "/login") {
                    scope.showNavbarElements=false;
                } else {
                    scope.showNavbarElements=true;
                };
            }, true);

            scope.navbarShowElements = function (data) {
                //debugger;
                //Ocultamos el boton de Login y mostramos el perfil logeado
                //scope.userName = data[0].first_name;
                //scope.sales = data[0].sales;
                //scope.user = JSON.parse($window.sessionStorage.user);
                //scope.user = JSON.parse(AuthenticationService.GetUser());
                //scope.userName = scope.user.username;
                //scope.sales = scope.user.sales;
                $location.path("/productos")
                //scope.showNavbarElements=true;
            };

            scope.navbarHideElements = function () {
                //AuthenticationService.ClearCredentials();
                AuthenticationService.ClearCredentialsSessionStorage();
                $location.path("/login")
                //scope.showNavbarElements=false;
            };

        }
    };
}]);
