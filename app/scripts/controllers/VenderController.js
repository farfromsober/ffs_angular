angular
    .module("farfromsober")
    .controller("VenderController", ["$scope", "APIFarFromSobersProvider", "$location", "azureBlob", "MessagesForUser", "$rootScope", "randomString", "configService", function($scope, APIFarFromSobersProvider, $location, azureBlob, MessagesForUser, $rootScope, randomString, configService) {

        var fileNames = [null, null, null, null];
        var files = [null, null, null, null];
        var uploadedFileIndexes = [];

        $scope.selectImage = function(file, fileId) {
            var userId = $rootScope.user.id;
            var imageIndex = fileId;
            var random = randomString(15);
            var fileName = userId + "-" + imageIndex + "-" + random;

            fileNames[imageIndex] = fileName;
            files[imageIndex] = file;
            //debugger;
        }


        $scope.submit = function () {
            angular.forEach(files, function(value, index) {
                //debugger;
                if (value) {
                    uploadImage(value, fileNames[index]);
                }
            });

        };



        function uploadImage(file, fileName) {
            //debugger;
            APIFarFromSobersProvider.getSasURL(fileName, function(sasUrl){
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
                    progress: function uploadProgress(percentComplete, data, status, headers, config) {
                        console.log("percentComplete = " + percentComplete);
                    },
                    complete: function uploadImageSuccess(data, status, headers, config) {
                        debugger;
                        var fileName = config.url.substr(config.url.lastIndexOf('/') + 1);
                        var fileIndex = fileName.split("-")[1];
                        if (uploadedFileIndexes.indexOf(fileIndex) == -1) {
                            uploadedFileIndexes.push(fileIndex);
                        }
                        if (uploadedFileIndexes.length == files.filter(function(val) { return val !== null; }).length) {
                            debugger;
                            uploadProduct();
                        }
                    },
                    error: function uploadImageSuccess(data, status, headers, config) {
                        debugger;
                        var fileName = config.url.substr(config.url.lastIndexOf('/') + 1);
                        var fileIndex = fileName.split("-")[1];
                        MessagesForUser.setErrorMessage("Ha habido problemas al subir la imagen numero " + fileIndex);
                        $scope.error = MessagesForUser.getErrorMessage();
                        setTimeout(function () {
                            $scope.$apply(function() {
                                $scope.error = null;
                                MessagesForUser.setErrorMessage("");
                            });
                        }, 3000);
                    },
                }
                azureBlob.upload(azureConfig);
            });
        };

        function uploadProduct() {
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
                    var urlsArray = [];
                    angular.forEach(fileNames, function(value, index) {
                        if (value != null){
                            urlsArray.push(configService.azureCdnUrl + configService.azureContainer + "/" + value);
                        }
                    });
                    var imagesObject = {
                        productId: response.data.id,
                        urls: urlsArray
                    }
                    debugger;

                    APIFarFromSobersProvider.postImageProducto(imagesObject, function(response){
                        console.log(response);
                        if (response.status == 201) {
                            MessagesForUser.setSuccessMessage("Producto creado correctamente");
                            $location.path("/productos")
                        } else{
                            MessagesForUser.setErrorMessage("Ha habido problemas al subir las imagenes del producto" + fileIndex);
                            $scope.error = MessagesForUser.getErrorMessage();
                            setTimeout(function () {
                                $scope.$apply(function() {
                                    $scope.error = null;
                                    MessagesForUser.setErrorMessage("");
                                });
                            }, 3000);
                        }
                    });
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
        }
    }]);