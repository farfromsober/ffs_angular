angular
    .module("farfromsober")
    .directive("comparteProducto", function(){

        return {
            restrict: "AE",
            templateUrl: "views/templates/ComparteProducto.html",
            replace: true,
            scope: {
                model: "="
            },
            link: function(scope){

            }
        };

    });