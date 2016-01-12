angular
    .module("farfromsober")
    .controller("VenderController", ["$scope", "APIFarFromSobersProvider", "$location", "azureBlob", "$rootScope", "randomString", "configService",
        function($scope, APIFarFromSobersProvider, $location, azureBlob,
                 $rootScope, randomString, configService) {

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
                debugger;
                if ($scope.product_name == undefined || $scope.product_price == undefined || $scope.categoria == undefined) {
                    swal({
                        title: "Error!",
                        text: "Los datos \"Title\", \"price\" y \"Category\" son obligatorios",
                        type: "error",
                        showCancelButton: false,
                        //confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Ok",
                        closeOnConfirm: true
                    });
                } else {
                    var hasImages = false;
                    angular.forEach(files, function(value, index) {
                        if (value) {
                            //debugger;
                            hasImages = true;
                            uploadImage(value, fileNames[index]);
                        }
                    });
                    if (!hasImages) {
                        uploadProduct();
                    }
                }
            };


            function goToProducts() {
                debugger;
                setTimeout(function() {
                    $location.path("/productos");
                    swal({
                        title: "Error!",
                        text: "Los datos \"Title\", \"price\" y \"Category\" son obligatorios",
                        type: "error",
                        showCancelButton: false,
                        //confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Ok",
                        closeOnConfirm: true
                    });
                }, 1);
            }


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
                            //debugger;
                            var fileName = config.url.substr(config.url.lastIndexOf('/') + 1);
                            var fileIndex = fileName.split("-")[1];
                            if (uploadedFileIndexes.indexOf(fileIndex) == -1) {
                                uploadedFileIndexes.push(fileIndex);
                            }
                            if (uploadedFileIndexes.length == files.filter(function(val) { return val !== null; }).length) {
                                //debugger;
                                uploadProduct();
                            }
                        },
                        error: function uploadImageSuccess(data, status, headers, config) {
                            debugger;
                            //TODO: show confirmation message to upload product without images: DONE!
                            swal({
                                title: "Atencion!",
                                text: "Se ha producido un error en la carga de las imagenes. ¿Desea subir el producto sin imágenes?",
                                type: "warning",
                                showCancelButton: true,
                                //confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Sí",
                                cancelButtonText: "No",
                                closeOnConfirm: true,
                                closeOnCancel: true
                            },
                                function (isConfirm) {
                                    if (isConfirm) {
                                        debugger;
                                        uploadProduct();
                                    } else {

                                    }
                                });
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
                //debugger;

                APIFarFromSobersProvider.postVentaProducto(productObject, function (response) {
                    if (response.status == 201) {
                        //debugger;
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
                        //debugger;

                        APIFarFromSobersProvider.postImageProducto(imagesObject, function(response){
                            console.log(response);
                            if (response.status == 201) {
                                //TODO: show success message: DONE!
                                debugger;

                                swal({
                                    title: "Genial!",
                                    text: "Producto subido correctamente!",
                                    type: "success",
                                    showCancelButton: false,
                                    //confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "Ok",
                                    closeOnConfirm: true
                                },
                                    function (isConfirm) {
                                        if (isConfirm) {
                                            debugger;
                                            goToProducts();
                                        }
                                    });

                            } else{
                                //TODO: show error message: DONE!
                                swal({
                                    title: "Error!",
                                    text: "El producto ha sido dado de alta, pero se ha producido un error al subir las imagenes.",
                                    type: "error",
                                    showCancelButton: false,
                                    //confirmButtonColor: "#DD6B55",
                                    confirmButtonText: "Ok",
                                    closeOnConfirm: true
                                });
                            }
                        });
                    } else {
                        debugger;
                        //TODO: show error message: DONE!
                        swal({
                            title: "Error!",
                            text: "Se ha producido un error al subir el producto. Por favor, inténtelo de nuevo.",
                            type: "error",
                            showCancelButton: false,
                            //confirmButtonColor: "#DD6B55",
                            confirmButtonText: "Ok",
                            closeOnConfirm: true
                        });
                        $scope.dataLoading = false;
                    }
                });
            }
        }]);