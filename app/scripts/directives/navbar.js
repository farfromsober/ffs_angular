angular.module("farfromsober").directive("navbarDirective", function() {

    return {
        templateUrl: "views/templates/Navbar.html",
        scope: {
            registerFormScope: '='
        },
        link: function postLink(scope) {
            scope.findProducts = function (){
                console.log(scope.form);
            }

        }

    };
});
