angular
    .module("farfromsober")
    .directive("navbarDirective", ["$location", "AuthService", function($location, AuthService) {

    return {
        templateUrl: "views/templates/Navbar.html",
        /*scope: {
            userIsLoged: '@'
        },*/
        link: function (scope) {

            scope.isCollapsed = true;

            scope.findProducts = function (){

                var latitude;
                var longitude;

                var name = scope.form.inputFindProducts.$viewValue;
                var category = scope.form.selectCategoria.$viewValue;
                var distance = scope.form.selectDistancia.$viewValue;
                if (distance){
                    var user = JSON.parse(AuthService.GetUser());
                    latitude = user.latitude;
                    longitude = user.longitude;
                }

                //Llamamos a la routesegment con los parametros a buscar
                $location.path("/findproductos").search({ category: category, name: name, distance: distance,
                    latitude: latitude, longitude: longitude });
            };

            scope.logout = function () {
                AuthService.ClearCredentials();
                $location.path("/login")
            };

        }
    };
}]);
