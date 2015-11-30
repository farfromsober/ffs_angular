angular
    .module("farfromsober")
    .directive("elementoUsuario", function(){

        return {
            restrict: "AE",
            templateUrl: "views/templates/ElementoUsuario.html",
            replace: true,
            scope: {
                model: "="
            },
            link: function(scope){

            }
        };

    });