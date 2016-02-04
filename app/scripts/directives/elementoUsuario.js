angular
    .module("farfromsober")
    .directive("elementoUsuario", ["configService", function(configService){

        return {
            restrict: "AE",
            templateUrl: "views/templates/ElementoUsuario.html",
            replace: true,
            scope: {
                model: "="
            },
            link: function(scope){
                scope.avatarPlaceholderURL = configService.avatarPlaceholderURL;
            }
        };

    }]);