angular.module("farfromsober").service("configService", function() {

    this.getURLBase = function () {
        return  'http://forsale.cloudapp.net/api/1.0/';
    }

    this.getFakeURLBase = function () {
        return 'http://beta.json-generator.com/api/json/';
    }

});