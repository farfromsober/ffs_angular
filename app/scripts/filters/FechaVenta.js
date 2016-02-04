angular
    .module("farfromsober")
    .filter("fechaVenta", function(){

        return function (fecha){
            return "Desde " + fecha;
        };

    });