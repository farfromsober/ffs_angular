angular
    .module("farfromsober")
    .directive("comparteProducto", ["configService", function(configService){

        return {
            restrict: "AE",
            templateUrl: "views/templates/ComparteProducto.html",
            replace: true,
            scope: {
                model: "="
            },
            link: function(scope){
                scope.facebookImageURL = configService.facebookImageURL;
                scope.twitterImageURL = configService.twitterImageURL;
            }
        };

    }]);