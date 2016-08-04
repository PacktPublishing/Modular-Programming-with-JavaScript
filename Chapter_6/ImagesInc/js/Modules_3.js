// testing the application with loose augmentation and override
/*
var ImagesInc_GlobalData = (function(coreModule) {
    coreModule.someText =
        "this is a test for overriding module properties with loose augmentation";
    coreModule.getExtendedModuleMsg = function() {
        ImagesInc_LoggingHandler.logInfo(coreModule.someText);
    };
    return coreModule;
})(ImagesInc_GlobalData || {});

*/


// testing our override using tight augmentation and override
/*

(function(coreModule) {
    if (!coreModule) {
        ImagesInc_LoggingHandler.logError(
            'coreModule was not found to be augmented!');
        alert('coreModule was not found to be augmented!');
        return false;
    }
    coreModule.original_someText = coreModule.someText;
    coreModule.someText =
        "this is a test for overriding module properties with TIGHT augmentation!";
    coreModule.getExtendedModuleMsg = function() {
        ImagesInc_LoggingHandler.logInfo(coreModule.someText);
    };
    coreModule.getExtendedModuleOriginalMsg = function() {
        ImagesInc_LoggingHandler.logInfo(coreModule.original_someText);
    };
})(ImagesInc_GlobalData);

*/


// Using tight augmentation to populated application content area

(function(coreModule) {
    if (!coreModule) {
        ImagesInc_LoggingHandler.logError(
            'coreModule was not found to be augmented!');
        alert('coreModule was not found to be augmented!');
        return false;
    }
    coreModule.original_someText = coreModule.someText;
    coreModule.someText =
        "this is a test for overriding module properties with TIGHT augmentation!";
    coreModule.getExtendedModuleMsg = function() {
        ImagesInc_LoggingHandler.logInfo(coreModule.someText);
    };
    coreModule.getExtendedModuleOriginalMsg = function() {
        ImagesInc_LoggingHandler.logInfo(coreModule.original_someText);
    };
})(ImagesInc_GlobalData);
