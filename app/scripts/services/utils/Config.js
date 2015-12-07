angular.module("farfromsober").service("configService", function() {

    this.getURLBase = function () {
        return 'http://forsale.cloudapp.net/api/1.0/';
    };

    this.photoPlaceholderURL = "http://az834438.vo.msecnd.net/farfromsober-images-container/photo_placeholder.png";
    this.avatarPlaceholderURL = "http://az834438.vo.msecnd.net/farfromsober-images-container/avatar_placeholder.png";
    this.facebookImageURL = "http://az834438.vo.msecnd.net/farfromsober-images-container/facebook.png";
    this.twitterImageURL = "http://az834438.vo.msecnd.net/farfromsober-images-container/twitter.png";

    this.getFakeURLBase = function () {
        return 'http://beta.json-generator.com/api/json/';
    }

});