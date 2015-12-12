angular
    .module('farfromsober')
    .service('MessagesForUser', function () {
        var successMessage;
        var errorMessage;
        var infoMessage;
        var warningMessage;


        this.getSuccessMessage = function () {
            return successMessage;
        };
        this.setSuccessMessage = function (value) {
            successMessage = value;
        };

        this.getErrorMessage = function () {
            return errorMessage;
        };
        this.setErrorMessage = function (value) {
            errorMessage = value;
        };

        this.getInfoMessage = function () {
            return infoMessage;
        };
        this.setInfoMessage = function (value) {
            infoMessage = value;
        };

        this.getWarningMessage = function () {
            return warningMessage;
        };
        this.setWarningMessage = function (value) {
            warningMessage = value;
        };
    });