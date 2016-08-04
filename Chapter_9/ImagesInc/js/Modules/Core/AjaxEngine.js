//****************************************************** 
//Responsible for making AJAX calls to server API
//******************************************************
ImagesInc_Core.jQueryAjaxEngine = (function() {
    var self = {},
        response, callbackFunc, page;
    self.makeAjaxCall = function(apiURL, QueryStr, method, callbackFunc) {
        self.makeAjaxCallToServer(apiURL, QueryStr, (method ||
            "GET"), callbackFunc);
    };
    self.returnResults = function(handler) {
        if (response) {
            // return the result back to the caller        
            handler(response);
        } else {
            self.showErrorMessage(
                'No response has been returned from the AJAX call'
            );
        }
    };
    self.loadPageByAjax = function(elemToAttachTo, pageSrc,
        sectionToExtractId, callbackFunc) {
        // if an id was sent then we need to extract only that piece from the loaded page
        if (sectionToExtractId) {
            pageSrc += " #" + sectionToExtractId;
        }
        $("#" + elemToAttachTo)
            .load(pageSrc, function(responseText, status, Xhr) {
                if (status == "success") {
                    if (typeof callbackFunc === 'function') {
                        callbackFunc();
                    }
                    return true;
                }
                if (status == "error") {
                    self.showErrorMessage(
                        'Ajax load has failed from loadPage method. ' +
                        xhr.status + " " + xhr.statusText);
                    return false;
                }
            });
    };
    self.getJSONObj = function(url, callbackFunc) {
        $.getJSON(url, function(data) {
                callbackFunc(data);
            })
            .fail(function() {
                self.showErrorMessage(
                    'Was not able to load page, from loadJSON method'
                );
            });
    };
    self.makeAjaxCallToServer = function(url, theQuery, method, handler) {
        // need this for IE call
        jQuery.support.cors = true;
        $.ajax({
                url: url,
                data: theQuery,
                type: method,
                processData: true,
                crossDomain: true,
                timeout: 10000,
                // dataType: "json",
                success: function(response) {
                    try {
                        // create a json object from the response. this is required for firefox.
                        response = JSON.parse(response);
                    } catch (e) {
                        // if it is not a json object then send as a string
                        response = response;
                    }
                },
                error: function(request, type, errorThrown) {
                    var errorMsg;
                    switch (type) {
                        case 'abort':
                            errorMsg =
                                'AJAX call has been aborted';
                            return;
                        case 'timeout':
                            errorMsg =
                                'AJAX call has timedout';
                            break;
                        case 'notmodified':
                            errorMsg =
                                'AJAX call has been notmodified';
                            break;
                        case 'parseerror':
                            errorMsg =
                                'AJAX Engine parse error';
                            break;
                        default:
                            errorMsg =
                                'A general error in AjaxEngine';
                    }
                    self.showErrorMessage(errorMsg +
                        errorThrown);
                },
                fail: function(msg) {
                    self.showErrorMessage(
                        'Failure in AjaxEngine ' + msg);
                }
            })
            .done(function() {
                // after the ajax call has returned values, call the function to return it to the caller
                self.returnResults(handler);
            })
            .always(function() {
                self.showInfoMessage("Ajax call was initiated",
                    "orange");
            });
    };
    self.showErrorMessage = function(message, color) {
        var msgColor = color || "red";
        if (ImagesInc_Core.log) {
            ImagesInc_Core.log(3, message, msgColor);
        } else {
            console.error(message);
        }
    };
    self.showInfoMessage = function(message, color) {
        var msgColor = color || "blue";
        if (ImagesInc_Core.log) {
            ImagesInc_Core.log(1, message, msgColor);
        } else {
            console.error(message);
        }
    };
    self.initialize = function() {
        self.showInfoMessage(
            'AjaxEngine Module has been initialized...');
    };
    // register with MainCore
    self.register = (function() {
        ImagesInc_Core.registerModule(self);
    })();
    return {
        makeAjaxCall: self.makeAjaxCall,
        loadPageByAjax: self.loadPageByAjax,
        getJSONObj: self.getJSONObj
    };
})();