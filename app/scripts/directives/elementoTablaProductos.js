angular
    .module("farfromsober")
    .directive("elementoTablaProductos", ["configService", function(configService){

        return {
            restrict: "AE",
            templateUrl: "views/templates/ElementoTablaProductos.html",
            replace: true,
            scope: {
                model: "="
            },
            link: function(scope){
                scope.photoPlaceholderURL = configService.photoPlaceholderURL;
            }
        };

    }]);