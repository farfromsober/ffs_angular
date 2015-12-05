angular
    .module("farfromsober")
    .directive("navbarDirective", ["$location", "AuthService", function($location, AuthService) {

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

            scope.logout = function () {
                AuthService.ClearCredentials();
                $location.path("/login")
            };

        }
    };
}]);
