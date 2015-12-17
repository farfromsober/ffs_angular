angular.module("farfromsober").service("APIFarFromSobersProvider", ["$http","$filter","$q","configService", "$rootScope", function($http,$filter,$q,configService, $rootScope) {

    this.getProductos = function() {
        //Utilizamos la caché para obtener los datos ahorrandonos la llamada a la API
        var config = {
            cache: true//,
        };
        return $http.get(configService.getURLBase() + "products/", config)
            .then(function (response) {
                return response;
            }, function (response) {
                return response;
            });
    };

    this.getProductoWithParam = function( category, name, distance ) {

        var config = {
            cache: true
        };
        
        //Crear la url con los parametros que nos llegan
        url = configService.getURLBase() + "products/?category=" + category;
        url += "&name=" + name;
        url += "&distance=" + distance;

        return $http.get(url, config);

    };

    this.getProductoById = function( id ) {

        var config = {
            cache: true
        };

        return $http.get(configService.getURLBase() + "products/" + id + "/", config)
            .then(function (response) {
                return response.data;
            }, function (response) {
                return response.data;
            });
    };


    this.getCategorias = function(){

        //Utilizamos la caché para obtener los datos ahorrandonos la llamada a la API
        var config = {
            cache: true
        };
        return $http.get(configService.getURLBase() + "get/E1BV0xy7x", config);

    };

    this.getPerfilVendidosById = function( id ) {
        return "";
    };

    this.getPerfilEnVentasById = function( id ) {
        return "";
    };

    this.getPerfilBusquedaById = function( id ) {
        return "";
    };

    this.getPerfilEditarById = function( id ) {
        return "";
    };

    this.getPerfilNotificacionesById = function( id ) {
        return "";
    };

    this.getLoginUsuario = function(username, password, callback) {
        debugger;
        var userObject = {
            user : username,
            password : password
        };
        return $http.post(configService.getURLBase() + "login/", userObject)
            .then(function (response) {
                debugger;
                callback(response);
            }, function (response) {
                debugger;
                callback(response);
            });
    };

    this.postRegistroUsuario = function( usuario ) {
        return "";
    };

    this.postVentaProducto = function( producto, callback ) {
        //Utilizamos la caché para obtener los datos ahorrandonos la llamada a la API
        var config = {
            cache: true//,
        }
        return $http.post(configService.getURLBase() + "products/", producto, config)
            .then(function (response) {
                debugger;
                console.log(response);
                callback(response) ;
            }, function (response) {
                debugger;
                callback(response) ;
                console.log(response);
            });
    };

    this.postEditarPerfil = function( producto ) {
        return "";
    };

    this.getSasURL = function( blobName, callback ) {
        var client = new WindowsAzure.MobileServiceClient(configService.azureEndpoint, configService.azureAppKey),
            todoItemTable = client.getTable('farfromsober');
        var params = "?blobName=" + blobName + "&containerName=" + configService.azureContainer;

        return client.invokeApi(configService.azureSasApi + params, {
                body:null,
                method: "get"
            })
            .then(function (results) {
                debugger;
                callback(results.result["sasUrl"]) ;
            }, function(error) {
                debugger;
                alert(error.message);
            });
    };

    this.uploadImage = function (sasUrl, file, callback) {
        debugger;
        return $http({
            method: 'PUT',
            url: sasUrl,
            headers: {
                'Authorization': undefined,
                'Content-Type': undefined,
                //'Content-Type': 'image/png'
                //'Content-Type': false
            },
            transformRequest: function (data) {
                var formData = new FormData();
                //need to convert our json object to a string version of json otherwise
                // the browser will do a 'toString()' on the object which will result
                // in the value '[Object object]' on the server.
                //formData.append("model", angular.toJson(data.model));
                //now add all of the assigned files
                for (var i = 0; i < data.files; i++) {
                    //add each file to the form data and iteratively name them
                    formData.append("file" + i, data.files[i]);
                }
                return formData;
            },
            data: {files: file}
        })
        .then(
            function (response) {
                /* success */
                debugger;
                callback(response);
            },
            function (response) {
                /* error */
                debugger;
                callback(response);
            }
        );
    };
}]);