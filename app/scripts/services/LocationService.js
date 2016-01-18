angular
    .module("farfromsober")
    .service("LocationService", ["$window", function($window){

        var currentLatitude = null;
        var currentLongitude = null;

        this.saveCurrentLocation = function(){
            if ($window.navigator) {
                navigator.geolocation.getCurrentPosition(function (position) {
                    currentLatitude = position.coords.latitude;
                    currentLongitude = position.coords.longitude;
                });
            }
        };

        this.getCurrentLatitude = function(){
            return currentLatitude;
        };

        this.getCurrentLongitude = function(){
            return currentLongitude;
        };

    }]);