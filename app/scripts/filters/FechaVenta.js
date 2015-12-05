angular
    .module("farfromsober")
    .filter("fechaVenta", function(){

        return function (fecha){
            return "A la venta desde " + fecha;
        };

    });