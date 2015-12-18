/**!
 * AngularJS Azure blob upload service with http post and progress.
 * @author  Stephen Brannan - twitter: @kinstephen
 * @version 1.0.1
 */
(function () {

    var azureBlobUpload = angular.module('azureBlobUpload', []);

    azureBlobUpload.factory('azureBlob',
        ['$log', '$http', azureBlob]);

    function azureBlob(console, $http) {

        var DefaultBlockSize = 1024 * 256 // Default to 32KB

        /* config: {
          baseUrl: // baseUrl for blob file uri (i.e. http://<accountName>.blob.core.windows.net/<container>/<blobname>),
          sasToken: // Shared access signature querystring key/value prefixed with ?,
          file: // File object using the HTML5 File API,
          progress: // progress callback function,
          complete: // complete callback function,
          error: // error callback function,
          blockSize: // Use this to override the DefaultBlockSize
        } */
        var upload = function (config) {
            var state = initializeState(config);
            var reader = new FileReader();
            reader.onloadend = function (evt) {
                if (evt.target.readyState == FileReader.DONE && !state.cancelled) { // DONE == 2
                    var uri = state.fileUrl + '&comp=block&blockid=' + state.blockIds[state.blockIds.length - 1];
                    var requestData = new Uint8Array(evt.target.result);
                    console.log(uri);
                    $.ajax({
                        url: uri,
                        type: "PUT",
                        data: requestData,
                        processData: false,
                        headers: {
                            'x-ms-version': '2015-04-05',
                            'Authorization': undefined,
                            'Content-Type': undefined,
                        },
                        success: function (data, status, headers, config) {
                            console.log(data);
                            console.log(status);
                            state.bytesUploaded += requestData.length;

                            var percentComplete = ((parseFloat(state.bytesUploaded) / parseFloat(state.file.size)) * 100).toFixed(2);
                            //if (state.progress) state.progress(percentComplete, data, status, headers, config);

                            uploadFileInBlocks(reader, state);
                        },
                        error: function(data, status, headers, config) {
                            debugger;
                            console.log(data);
                            console.log(status);
                        }
                    });
                    /*$http.put(uri, requestData,
                        {
                            headers: {
                                'x-ms-version': '2015-04-05',
                                'Authorization': undefined,
                                'Content-Type': undefined,
                            },
                        }).success(function (data, status, headers, config) {
                            console.log(data);
                            console.log(status);
                            state.bytesUploaded += requestData.length;

                            var percentComplete = ((parseFloat(state.bytesUploaded) / parseFloat(state.file.size)) * 100).toFixed(2);
                            //if (state.progress) state.progress(percentComplete, data, status, headers, config);

                            uploadFileInBlocks(reader, state);
                        })
                        .error(function (data, status, headers, config) {
                            debugger;
                            console.log(data);
                            console.log(status);

                            //if (state.error) state.error(data, status, headers, config);
                        });
                        */
                }
            };

            uploadFileInBlocks(reader, state);

            return {
                cancel: function() {
                    state.cancelled = true;
                }
            };
        };

        var initializeState = function (config) {
            debugger;
            var blockSize = DefaultBlockSize;
            if (config.blockSize) blockSize = config.blockSize;

            var maxBlockSize = blockSize; // Default Block Size
            var numberOfBlocks = 1;

            var file = config.file;

            var fileSize = file.size;
            if (fileSize < blockSize) {
                maxBlockSize = fileSize;
                console.log("max block size = " + maxBlockSize);
            }

            if (fileSize % maxBlockSize == 0) {
                numberOfBlocks = fileSize / maxBlockSize;
            } else {
                numberOfBlocks = parseInt(fileSize / maxBlockSize, 10) + 1;
            }

            console.log("total blocks = " + numberOfBlocks);
            //debugger;
            return {
                maxBlockSize: maxBlockSize, //Each file will be split in 256 KB.
                numberOfBlocks: numberOfBlocks,
                totalBytesRemaining: fileSize,
                currentFilePointer: 0,
                blockIds: new Array(),
                blockIdPrefix: 'block-',
                bytesUploaded: 0,
                submitUri: null,
                file: file,
                baseUrl: config.baseUrl,
                sasToken: config.sasToken,
                fileUrl: config.baseUrl + config.sasToken,
                progress: config.progress,
                complete: config.complete,
                error: config.error,
                cancelled: false
            };
        };

        var uploadFileInBlocks = function (reader, state) {
            if (!state.cancelled) {
                if (state.totalBytesRemaining > 0) {
                    console.log("current file pointer = " + state.currentFilePointer + " bytes read = " + state.maxBlockSize);

                    var fileContent = state.file.slice(state.currentFilePointer, state.currentFilePointer + state.maxBlockSize);
                    var blockId = state.blockIdPrefix + pad(state.blockIds.length, 6);
                    console.log("block id = " + blockId);

                    state.blockIds.push(btoa(blockId));
                    reader.readAsArrayBuffer(fileContent);

                    state.currentFilePointer += state.maxBlockSize;
                    state.totalBytesRemaining -= state.maxBlockSize;
                    if (state.totalBytesRemaining < state.maxBlockSize) {
                        state.maxBlockSize = state.totalBytesRemaining;
                    }
                } else {
                    commitBlockList(state);
                }
            }
        };

        var commitBlockList = function (state) {
            var uri = state.fileUrl + '&comp=blocklist';
            console.log(uri);

            var requestBody = '<?xml version="1.0" encoding="utf-8"?><BlockList>';
            for (var i = 0; i < state.blockIds.length; i++) {
                requestBody += '<Latest>' + state.blockIds[i] + '</Latest>';
            }
            requestBody += '</BlockList>';
            console.log(requestBody);
            $http.put(uri, requestBody,
            {
                headers: {
                    //'x-ms-blob-type': 'BlockBlob',
                    'x-ms-version': '2015-04-05',
                    'Authorization': undefined,
                    'Content-Type': undefined,
                }
            }).success(function (data, status, headers, config) {
                debugger;
                console.log(data);
                console.log(status);
                //if (state.complete) state.complete(data, status, headers, config);
            })
            .error(function (data, status, headers, config) {
                debugger;
                console.log(data);
                console.log(status);
                //if (state.error) state.error(data, status, headers, config);
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
        };

        var pad = function (number, length) {
            var str = '' + number;
            while (str.length < length) {
                str = '0' + str;
            }
            return str;
        };

        return {
            upload: upload,
        };
    };

})();
