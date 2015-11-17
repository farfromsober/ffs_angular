angular
    .module("farfromsober")
    .directive("elementoTablaProductos", function(){

        return {
            restrict: "AE",
            templateUrl: "views/templates/ElementoTablaProductos.html",
            replace: true,
            scope: {
                model: "="
            },
            link: function(scope){

            }
        };

    });