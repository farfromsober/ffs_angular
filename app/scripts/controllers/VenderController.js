angular
    .module("farfromsober")
    .controller("VenderController", ["$scope", "APIFarFromSobersProvider", "$location", "azureBlob", function($scope, APIFarFromSobersProvider, $location, azureBlob) {
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

            /*
            var azureConfig = {
                baseUrl: "https://farfromsober.blob.core.windows.net/farfromsober-images-container/subida_angular_prueba",
                sasToken: "?tv2oqlfCxzFUm7/dYgBGD6YW5K1eQOROVGqqDVm3ijaJpdhxwpkW5OttAFS70++IAcEReSdc0fR/zc06CKrkWQ==",
                file: "https://dl.dropboxusercontent.com/u/4539692/4sale-navbar.png",
                progress:"null",
                complete:"null",
                error:"null",
                blockSize:"null"
            }

            azureBlob.upload(azureConfig);
            */

            APIFarFromSobersProvider.postVentaProducto(productObject, function (response) {
                if (response.status == 201) {
                    debugger;
                    console.log(response);
                    $location.path("/productos")
                } else {
                    debugger;
                    $scope.error = "Ha habido problemas al crear el producto. Por favor, inténtalo de nuevo."
                    $scope.dataLoading = false;
                }
            });
        };
    }]);