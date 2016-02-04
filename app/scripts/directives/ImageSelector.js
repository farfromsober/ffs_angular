angular
    .module("farfromsober")
    .directive("imageSelector", ["configService", function(configService){
        return {
            restrict: "E",
            scope: {
                model: "=",
                imageId: "=",
                imageSelected: "&"
            },
            templateUrl: "views/templates/ImageSelector.html",
            link: function(scope, element){
                scope.photoPlaceholderURL = configService.photoPlaceholderURL;
                element.bind("change", function( e ){
                    scope.imageSelected({
                        "file": e.target.files[0],
                        "fileId": scope.imageId
                    });
                });
            }
        };
    }]);