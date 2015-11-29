angular
    .module("farfromsober")
    .controller("SectionController", ["$scope", "$routeSegment", "$location", function($scope,$routeSegment,$location){

        // Arrancamos con la página de login
        $routeSegment.startsWith( "login" );
    }]);
