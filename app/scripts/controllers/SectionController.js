angular
    .module("farfromsober")
    .controller("SectionController", ["$scope", "$routeSegment", "$location", function($scope,$routeSegment,$location){

        $routeSegment.startsWith( "productos" );
        $location.path( "/productos" );
    }]);
