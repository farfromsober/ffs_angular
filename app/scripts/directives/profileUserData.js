angular
    .module("farfromsober")
    .directive("profileUserData", [function() {

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
                }
            }
        };
    }]);