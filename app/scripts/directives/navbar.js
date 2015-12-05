angular
    .module("farfromsober")
    .directive("navbarDirective", ["$location", "APIFarFromSobersProvider", function($location, APIFarFromSobersProvider) {

    return {
        templateUrl: "views/templates/Navbar.html",
        /*scope: {
            iconsLogin: '=',
            iconsProfile: '='
        },*/
        transclude: false,
        link: function postLink(scope) {
            scope.findProducts = function (){
                var name = scope.form.inputFindProducts.$viewValue;
                var category = scope.form.selectCategoria.$viewValue;
                var distance = scope.form.selectDistancia.$viewValue;

                //Llamamos a la routesegment con los parametros a buscar
                $location.path("/findproductos").search({ category: category, name: name, distance: distance });

            };

            scope.hideLoginIconsDirective = function (data) {
                //Ocultamos el boton de Login y mostramos el perfil logueado
                scope.userName = data[0].username;
                scope.sales = data[0].sales;
                scope.iconsLogin = true;
                scope.iconsProfile = true;

            };

            scope.showLoginIconsDirective = function () {
                //Mostramos el boton de Login y ocultamos el perfil logueado
                scope.iconsLogin = false;
                scope.iconsProfile = false;
            };

            // Pasamos las categorías
            APIFarFromSobersProvider.getCategorias().then(function(data){

                scope.categorias = data.data;

            });
            /*scope.categorias = [
                    {index:1, name:'primera'},
                    {index:2, name:'segunda'},
                    {index:3, name:'tercera'}
            ];*/


        },
        controller: function($scope){
            //Utilizamos estos métodos para acceder desde otro controlador
            $scope.hideLoginIcons = function (data) {
                $scope.hideLoginIconsDirective(data);

            };

            $scope.showLoginIcons = function () {
                $scope.showLoginIconsDirective();
            };
        }

    };
}]);
