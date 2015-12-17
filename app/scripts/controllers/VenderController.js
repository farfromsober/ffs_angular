angular
    .module("farfromsober")
    .controller("VenderController", ["$scope", "APIFarFromSobersProvider", "$location", "azureBlob", "MessagesForUser", "$http", function($scope, APIFarFromSobersProvider, $location, azureBlob, MessagesForUser, $http) {

        $scope.upload = function(file) {
            APIFarFromSobersProvider.getSasURL(file.name, function(sasUrl){
                //debugger;
                var indexOfQueryStart = sasUrl.indexOf("?");
                var baseUrl = sasUrl.substring(0, indexOfQueryStart);
                var sasToken = sasUrl.substring(indexOfQueryStart);
                console.log("baseUrl: "+baseUrl);
                console.log("sasToken: "+sasToken);
                //"http://farfromsober.blob.core.windows.net:80/farfromsober-images-container/ziphone_6.jpg?se=2015-12-17T14%3A32%3A16Z&sr=b&sp=rw&sig=fQh0mKdfWEGIawjfAayO2wuQ3uBpTrXLoyiNekm3%2FfU%3D"
                var azureConfig = {
                    baseUrl: baseUrl,
                    sasToken: sasToken,
                    file: file,
                    progress:"null",
                    complete:"null",//"uploadImageSuccess",
                    error:"null",//"uploadImageError",
                }
                azureBlob.upload(azureConfig);
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