var ImagesInc_LoggingHandler = (function() {
    // module private variables
    var defaultHelloMsg = "this is just to say Hello to the users!",
        theInterface = {};
    // privileged method
    theInterface.logError = function(errorMsg) {
        console.error(errorMsg);
    };
    // privileged method
    theInterface.logInfo = function(infoMsg) {
        if (!infoMsg) {
            infoMsg = defaultHelloMsg;
        }
        console.log(infoMsg);
    };
    return theInterface;
})();