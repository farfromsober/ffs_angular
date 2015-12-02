angular.module("farfromsober").service("configService", function() {

    this.getURLBase = function () {
        return 'http://beta.json-generator.com/api/json/';
    };

    this.placeHolderURL = "http://www.turnaron.es/media/miscelanea/sinfoto.jpg";
    this.facebookImageURL = "https://www.facebookbrand.com/img/fb-art.jpg";
    this.twitterImageURL = "http://icons.iconarchive.com/icons/sicons/basic-round-social/512/twitter-icon.png";

});