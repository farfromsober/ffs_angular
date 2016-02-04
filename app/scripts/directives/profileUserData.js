angular
    .module("farfromsober")
    .directive("profileUserData", ["configService", function(configService) {

        return {
            templateUrl: "views/templates/ProfileUserData.html",
            restrict: "AE",
            replace: true,
            scope: {
                profileUser: "=",
                profileOption: "="
            },
            link: function (scope) {
                scope.isActive = function (option) {
                    if (option == scope.profileOption)
                        return 'active';
                    else
                        return 'inactive';
                };
                scope.editProfile = function (){
                    return (scope.$root.user.id == scope.profileUser.id);
                };
                scope.canSeeBought = function (){
                    return (scope.$root.user.id == scope.profileUser.id);
                };
                scope.avatarPlaceholderURL = configService.avatarPlaceholderURL;
            }
        };
    }]);