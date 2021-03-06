﻿var httpMethod;
(function (httpMethod) {
    httpMethod[httpMethod["GET"] = 0] = "GET";
    httpMethod[httpMethod["POST"] = 1] = "POST";
})(httpMethod || (httpMethod = {}));
;

/**
* This class exists to provide an easy way to make HTTP requests
* And get JSON objects in response.
*/
var JsonRequest = (function () {
    function JsonRequest() {
    }
    /**
    * Internal method to send an http request to some URL and
    * return a JSON object via a Promise.
    *
    * @param url The URL to send the request to
    * @param httpMethod HTTP method used in request
    * @param postData POST data to send, if the method used is post
    */
    JsonRequest.httpRequest = function (url, method, postData, authToken) {
        // I promise I'll do this. Pinky swear.
        return new Promise(function (resolve, reject) {
            var req = new XMLHttpRequest();
            switch (method) {
                case 0 /* GET */:
                    req.open('GET', url);
                    break;
                case 1 /* POST */:
                    req.open('POST', url);
                    break;
            }

            if (typeof authToken !== 'undefined') {
                req.setRequestHeader("Authorization", "Bearer " + authToken);
            }

            req.onload = function () {
                // This is called even on 404 etc
                // so check the status
                if (req.status == 200) {
                    if (req.responseText.length > 0) {
                        // Resolve the promise with the response text
                        var result = JSON.parse(req.responseText);

                        // OData queries return their results in the 'value' element
                        if (typeof result.value !== 'undefined') {
                            var tResult = result.value;
                        } else {
                            var tResult = result;
                        }
                        resolve(tResult);
                    } else {
                        resolve(null);
                    }
                } else {
                    // Otherwise reject with the status text
                    // which will hopefully be a meaningful error
                    reject(Error(req.statusText));
                }
            };

            // Handle network errors
            req.onerror = function () {
                reject(Error("Network Error"));
            };

            switch (method) {
                case 0 /* GET */:
                    req.send();
                    break;
                case 1 /* POST */:
                    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    var postBody = "";
                    for (var field in postData) {
                        if (postBody.length > 0) {
                            postBody += "&";
                        }
                        postBody += encodeURIComponent(field) + "=" + encodeURIComponent(postData[field]);
                    }
                    req.send(postBody);
                    break;
            }
        });
    };

    /**
    * A method to perform a GET HTTP request and parse resulting JSON
    *
    * @param url URL to request
    */
    JsonRequest.httpGet = function (url, authToken) {
        return JsonRequest.httpRequest(url, 0 /* GET */, null, authToken);
    };

    /**
    * A method to perform a POST HTTP request and parse resulting JSON
    *
    * @param url URL to request
    * @param postData JSON post data to send
    */
    JsonRequest.httpPost = function (url, postData, authToken) {
        return JsonRequest.httpRequest(url, 1 /* POST */, postData, authToken);
    };
    return JsonRequest;
})();
//# sourceMappingURL=JsonRequest.js.map
