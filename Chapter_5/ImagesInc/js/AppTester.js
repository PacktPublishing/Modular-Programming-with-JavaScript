// very basic testing of our application as we develop
var AppTester = (function() {
    // generate footer, header and content area of index.html based on object definitions for these sections
    try {
        ImagesInc_PageUpdater.updateElement("headerContainer",
            ImagesInc_GlobalData.getHeaderHTMLTxt());
        ImagesInc_PageUpdater.updateElement("footerContainer",
            ImagesInc_GlobalData.getFooterHTMLTxt());
        ImagesInc_PageUpdater.updateElement("mainPageContainer",
            ImagesInc_GlobalData.getContentAreaHTMLTxt());
    } catch (e) {
        ImagesInc_LoggingHandler.logError(
            'PageUpdater module not found');
    }
    //testing message logging mechanism
    try {
        ImagesInc_LoggingHandler.logError(
            "this is a test for logging errors!");
        ImagesInc_LoggingHandler.logInfo();
    } catch (e) {
        ImagesInc_LoggingHandler.logError(
            'LogginHandler module not found');
    }
    //testing access control to our module private properties
    try {
        console.log(ImagesInc_GlobalData.headerContainerDef.sectionHTML);
        console.log(ImagesInc_GlobalData.footerContainerDef.sectionHTML);
    } catch (e) {
        ImagesInc_LoggingHandler.logError(
            'could not access the property');
    }
    //testing GlobalData augmentation
    ImagesInc_GlobalData.getExtendedModuleMsg();
    // testing access to the original module property which was overridden using tight augmentation
    //make sure you uncomment related code in Modules_3.js before you run this test
    //ImagesInc_GlobalData.getExtendedModuleOriginalMsg();
})();