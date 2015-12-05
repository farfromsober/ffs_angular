angular
    .module("farfromsober")
    .directive("navbarDirective", ["$location", "AuthService", "APIFarFromSobersProvider", function($location, AuthService, APIFarFromSobersProvider) {

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

            scope.navbarShowElements = function () {
                scope.user = JSON.parse(AuthService.GetUser());
                $location.path("/productos");
                scope.showNavbarElements=true;
            };

            // Pasamos las categorías
            APIFarFromSobersProvider.getCategorias().then(function(data){

                scope.categorias = data.data;

            });


        },
        controller: function($scope){
            //Utilizamos estos métodos para acceder desde otro controlador
            $scope.hideLoginIcons = function (data) {
                $scope.hideLoginIconsDirective(data);
            };

            $scope.navbarHideElements = function () {
                AuthService.ClearCredentials();
                $location.path("/login");
                scope.showNavbarElements=false;
            };

        }
    }
}]);
