angular
    .module("farfromsober")
    .directive("imageSelector", ["configService", function(configService){
        return {
            restrict: "E",
            scope: {
                imageSelected: "&"
            },
            templateUrl: "views/templates/ImageSelector.html",
            replace: true,
            link: function(scope, element){
                /* scope.photoPlaceholderURL = configService.photoPlaceholderURL;
                scope.id = "";
                scope.name = "";*/
                element.bind("change", function( e ){
                    scope.imageSelected({ "file": e.target.files[0] });
                });
            }
        };
    }]);