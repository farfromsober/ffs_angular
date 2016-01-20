angular
    .module("farfromsober")
    .controller("ProductoController", ["$scope", "Producto", "configService", "APIFarFromSobersProvider", "AuthService",
        "$location", function($scope, Producto, configService, APIFarFromSobersProvider, AuthService, $location) {

        console.log(Producto);
        $scope.producto = Producto;
        $scope.selectedImage = Producto.images[0];

        $scope.changeImage = function(n){
            $scope.selectedImage = Producto.images[n]
        };

        $scope.photoPlaceholderURL = configService.photoPlaceholderURL;
        $scope.avatarPlaceholderURL = configService.avatarPlaceholderURL;

        confirmBuy = function(){
            swal({
                title: "Confirmación",
                text: "¿Estás seguro de que quieres comprar este producto?",
                type: "info",
                showCancelButton:true,
                confirmButtonText: "Sí",
                closeOnConfirm: true
            },
            function (isConfirm){
                if (isConfirm){
                    buyIt();
                }
            })
        };

        buyIt = function(){

            var user = JSON.parse(AuthService.GetUser());
            APIFarFromSobersProvider.postTransaction(Producto.id, user.id, function(response){

                console.log(response);
                if (response.status == 201){
                    swal({
                            title: "Genial!",
                            text: "Has comprado el producto!",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonText: "Ok",
                            closeOnConfirm: true
                        },
                        function (isConfirm) {
                            if (isConfirm) {
                                goBackToProducts();
                            }
                        });

                } else {
                    swal({
                        title: "Error!",
                        text: "Se ha producido un error en la compra. Disculpe las molestias.",
                        type: "error",
                        showCancelButton: false,
                        confirmButtonText: "Ok",
                        closeOnConfirm: true
                    });
                }
            });

        };

        function goBackToProducts() {
            debugger;
            $location.path("/productos");
            $scope.$apply();
        }

    }]);