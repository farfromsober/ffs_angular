angular.module("farfromsober").service("configService", function() {

    this.getURLBase = function () {
        return 'http://beta.json-generator.com/api/json/';
    }

});