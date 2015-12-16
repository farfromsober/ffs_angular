angular
    .module("farfromsober")
    .controller("VenderController", ["$scope", "APIFarFromSobersProvider", "$location", "azureBlob", "MessagesForUser", function($scope, APIFarFromSobersProvider, $location, azureBlob, MessagesForUser) {

        $scope.upload = function(file) {
            debugger;
            var fileName = file.name;
            APIFarFromSobersProvider.getSasURL(file.name, function(sasUrl){
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
            debugger;

            var file_1 = document.getElementById('imageSelector').files[0];
            //var image_file = document.getElementById('imageSelector').files[0];

             /*var azureConfig = {
             baseUrl: "https://farfromsober.blob.core.windows.net/farfromsober-images-container/subida_angular_prueba",
             sasToken: "?tv2oqlfCxzFUm7/dYgBGD6YW5K1eQOROVGqqDVm3ijaJpdhxwpkW5OttAFS70++IAcEReSdc0fR/zc06CKrkWQ==",
             file: file_1,
             progress:"null",
             complete:"uploadImageSuccess",
             error:"uploadImageError",
             blockSize:"null"
             }

             azureBlob.upload(azureConfig);*/


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