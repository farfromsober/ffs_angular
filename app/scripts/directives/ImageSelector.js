angular
    .module("farfromsober")
    .directive("imageSelector", function(){
        return {
            restrict: "E",
            scope: {
                imageId: "=",
                imageSelected: "&"
            },
            templateUrl: "views/templates/ImageSelector.html",
            link: function(scope, element){
                element.bind("change", function( e ){
                    scope.imageSelected({
                        "file": e.target.files[0],
                        "fileId": scope.imageId
                    });
                });
            }
        };
    });