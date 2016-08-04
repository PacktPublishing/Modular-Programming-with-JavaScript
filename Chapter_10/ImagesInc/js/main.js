// Application bootstrap file
var modulesToLoad = ['MainCore', 'Logger', 'AjaxEngine', 'CookieHandler',
    'NotificationHandler', 'StorageHandler', 'Utilities',
    'ImagesInc_Content', 'ImagesInc_Footer', 'ImagesInc_Header', 'SandBox',
    'AppTester', 'CookieHandlerTester', 'StorageHandlerTester', 'Base',
    'jquery', 'GlobalData_Sub', 'GlobalData'];

require(modulesToLoad, function(ImagesInc_Core, Logger, AjaxEngine,
    CookieHandler, NotificationHandler, StorageHandler, Utilities,
    ImagesInc_Content, ImagesInc_Footer, ImagesInc_Header, SandBox,
    Base, jquery, GlobalData_Sub, GlobalData) {
    //register StorageHandler with MainCore
    ImagesInc_Core.StorageHandler.register = (function() {
        ImagesInc_Core.registerModule(ImagesInc_Core.StorageHandler);
    })();
    //add error handling to all methods of StorageHandler, in case localStorage not available
    if (ImagesInc_Core.Utilitizes) {
        ImagesInc_Core.Utilitizes.addLocalStorageCheck(ImagesInc_Core.StorageHandler);
    }
    ImagesInc_Core.initializeAllModules();
    ImagesInc_Core.initializeAllComponents();
    // uncomment below if you'd like to run some unit test and then see results in the console
    // remember that running tests deletes all the cookie and localstorage values for the this app
    //ImagesInc_Core.runAllUnitTests();
    ImagesInc_Core.handlePageChange(location.pathname);
});