angular
    .module("farfromsober")
    .controller("VenderController", ["$scope", "APIFarFromSobersProvider", "$location", function($scope, APIFarFromSobersProvider, $location) {
        $scope.submit = function () {
            $scope.dataLoading = true;

            // Creamos el objeto producto que enviaremos con la llamada a la API.
            var productObject = {
                name: $scope.product_name,
                description: $scope.product_description,
                price: $scope.product_price,
                category: $scope.category
            }

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