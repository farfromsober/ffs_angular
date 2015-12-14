angular
    .module("farfromsober")
    .controller("VenderController", ["$scope", "APIFarFromSobersProvider", "$location", "azureBlob", "MessagesForUser", function($scope, APIFarFromSobersProvider, $location, azureBlob, MessagesForUser) {

        $scope.upload = function(file) {
            debugger;
            APIFarFromSobersProvider.getSasURL("carnet180", function(sasUrl){
                APIFarFromSobersProvider.uploadImage(sasUrl, file, function(response) {

                });
            });
        };

        $scope.submit = function () {
            $scope.dataLoading = true;

            // Creamos el objeto producto que enviaremos con la llamada a la API.
            var productObject = {
                name: $scope.product_name,
                description: $scope.product_description,
                price: $scope.product_price,
                category: {
                    index: $scope.categoria
                }
            }

            var file_1 = document.getElementById('product_image_1').files[0];
            var file_2 = document.getElementById('product_image_2').files[0];
            var file_3 = document.getElementById('product_image_3').files[0];
            var file_4 = document.getElementById('product_image_4').files[0];

            debugger;
            var images = [
                file_1,
                file_2,
                file_3,
                file_4
            ];

            APIFarFromSobersProvider.postVentaProducto(productObject, function (response) {
                if (response.status == 201) {
                    debugger;
                    console.log(response);


                } else {
                    debugger;
                    MessagesForUser.setErrorMessage("Ha habido problemas al crear el producto. Por favor, inténtalo de nuevo.");
                    $scope.error = MessagesForUser.getErrorMessage();
                    setTimeout(function () {
                        $scope.$apply(function() {
                            $scope.error = null;
                            MessagesForUser.setErrorMessage("");
                        });
                    }, 3000);
                    $scope.dataLoading = false;
                }
            });
        };

        function uploadImageSuccess() {
            debugger;
            MessagesForUser.setSuccessMessage("Producto creado correctamente");
            $location.path("/productos")
        }

        function uploadImageError() {
            debugger;
            MessagesForUser.setErrorMessage("Ha habido problemas al subir la imagen.");
            $scope.error = MessagesForUser.getErrorMessage();
            setTimeout(function () {
                $scope.$apply(function() {
                    $scope.error = null;
                    MessagesForUser.setErrorMessage("");
                });
            }, 3000);
        }
    }]);