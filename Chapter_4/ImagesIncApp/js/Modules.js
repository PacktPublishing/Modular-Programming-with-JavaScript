var headerContainerDef = {
    sectionHTML: '<div class="logo_titleClass" >' +
        '<a href=""><img src="img/ImagesIncLogo.png" alt="Company Logo" style="max-height:100%;"></a>' +
        '<div class="siteTitleClass">Images Inc.</div>' + '</div>' +
        '<nav role="navigation" itemscope itemtype="https://schema.org/SiteNavigationElement">' +
        '<h1 class="hiddenClass">Main Navigation</h1>' +
        '<ul class="navmenuClass" >' +
        '<li><a href="#" class="active">Home</a></li>' +
        '<li><a href="#">Our Company</a></li>' +
        '<li><a href="#">Pricing</a></li>' +
        '<li><a href="#">Contact Us</a></li>' + '</ul>' + '</nav>'
};
var footerContainerDef = {
    sectionHTML: '<div>' + '<a href="#">Latest News</a>' + '</div>' +
        '<div>' + '<a href="#">Services</a>' + '</div>' + '<div>' +
        '<a href="#">Support</a>' + '</div>'
};
//The above object definitions are better kept in a GlobalData module as below
var GlobalData = (function() {
    var headerContainerDef = {
        sectionHTML: '<div class="logo_titleClass" >' +
            '<a href=""><img src="img/ImagesIncLogo.png" alt="Company Logo" style="max-height:100%;"></a>' +
            '<div class="siteTitleClass">Images Inc.</div>' +
            '</div>' +
            '<nav role="navigation" itemscope itemtype="https://schema.org/SiteNavigationElement">' +
            '<h1 class="hiddenClass">Main Navigation</h1>' +
            '<ul class="navmenuClass" >' +
            '<li><a href="#" class="active">Home</a></li>' +
            '<li><a href="#">Our Company</a></li>' +
            '<li><a href="#">Pricing</a></li>' +
            '<li><a href="#">Contact Us</a></li>' + '</ul>' +
            '</nav>'
    };
    var footerContainerDef = {
        sectionHTML: '<div>' + '<a href="#">Latest News</a>' +
            '</div>' + '<div>' + '<a href="#">Services</a>' +
            '</div>' + '<div>' + '<a href="#">Support</a>' +
            '</div>'
    };
    return {
        getHeaderHTMLTxt: function() {
            return headerContainerDef.sectionHTML;
        },
        getFooterHTMLTxt: function() {
            return footerContainerDef.sectionHTML;
        }
    };
})();
var PageUpdater = (function() {
    // module private function
    var insertHTMLTxt = function(containerID, newStructure) {
        var theContainer = document.getElementById(containerID);
        theContainer.innerHTML = newStructure;
    };
    // module private function
    var applyElementCSS = function(elementID, className) {
        var theElement = document.getElementById(elementID);
        theElement.className = className;
    };
    return {
        // privileged method
        updateElement: function(elemID, htmlTxt) {
            insertHTMLTxt(elemID, htmlTxt);
        },
        // privileged method
        updateElementClass: function(elemId, className) {
            if (!className) {
                console.error(
                    'No class name has been provided, exiting module!'
                );
            }
            applyElementCSS(elemId, className);
        }
    };
})();
var LoggingHandler = (function() {
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
// update the innerHTML of footer and header based on object definitions for this section
PageUpdater.updateElement("headerContainer", headerContainerDef.sectionHTML);
PageUpdater.updateElement("footerContainer", footerContainerDef.sectionHTML);
alert("changing footer class");
// change the CSS class for the footer
PageUpdater.updateElementClass("footerParentContainer",
    "footerContainerClass_Test");
//A Better way of doing above is to use the GlobalData module as below, comment the function calls above and uncomment the function calls below to use the GlobalData module
// update the innerHTML of footer and header based on object definitions for these sections
//PageUpdater.updateElement("headerContainer", GlobalData.getHeaderHTMLTxt());
//PageUpdater.updateElement("footerContainer", GlobalData.getFooterHTMLTxt());
//alert("changing footer class");
// change the CSS class for the footer
//PageUpdater.updateElementClass("footerParentContainer", "footerContainerClass_Test");
LoggingHandler.logError("this is a test for logging errors!");
LoggingHandler.logInfo();