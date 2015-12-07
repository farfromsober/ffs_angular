angular.module("farfromsober").service("configService", function() {

    this.getURLBase = function () {
        return 'http://forsale.cloudapp.net/api/1.0/';
    };

    this.photoPlaceholderURL = "http://az834438.vo.msecnd.net/farfromsober-images-container/photo_placeholder.png";
    this.avatarPlaceholderURL = "http://az834438.vo.msecnd.net/farfromsober-images-container/avatar_placeholder.png";
    this.facebookImageURL = "https://www.facebookbrand.com/img/fb-art.jpg";
    this.twitterImageURL = "http://icons.iconarchive.com/icons/sicons/basic-round-social/512/twitter-icon.png";

    this.getFakeURLBase = function () {
        return 'http://beta.json-generator.com/api/json/';
    }

});