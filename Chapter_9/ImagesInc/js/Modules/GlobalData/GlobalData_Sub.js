var ImagesInc_GlobalData = ImagesInc_GlobalData || null;
var ImagesInc_PageSections = (function(mainModule, subModule) {
    // assigning the subModule if it is passed in and also augmenting sub-module
    var pageSections = mainModule.pageSections = mainModule.pageSections ||
        subModule;
    pageSections.headerContainerDefObj = {
        sectionHTML: '<div id="logoDiv" class="logo_titleClass" >' +
            '<a href="#" id="siteLogo"><img src="Images/ImagesIncLogo.png" alt="Company Logo" style="max-height:100%;"></a>' +
            '<div class="siteTitleClass">Images Inc.</div>' +
            '</div>' +
            '<nav role="navigation" itemscope itemtype="https://schema.org/SiteNavigationElement">' +
            '<h1 class="hiddenClass">Main Navigation</h1>' +
            '<ul class="navmenuClass" >' +
            '<li><a id="Home" href="#" class="active">Home</a></li>' +
            '<li><a id="Favorites" href="#">Favorites</a></li>' +
            '<li><a href="#">Pricing</a></li>' +
            '<li><a href="#">Contact Us</a></li>' + '</ul>' +
            '</nav>'
    };
    pageSections.footerContainerDefObj = {
        sectionHTML: '<div id="latestNews">' +
            '<a href="#">Latest News</a>' + '</div>' +
            '<div id="services">' + '<a href="#">Services</a>' +
            '</div>' + '<div id="support">' +
            '<a href="#">Support</a>' + '</div>'
    };
    mainModule.getHeaderHTMLTxt = function() {
        return pageSections.headerContainerDefObj.sectionHTML;
    };
    mainModule.getFooterHTMLTxt = function() {
        return pageSections.footerContainerDefObj.sectionHTML;
    };
    if (!ImagesInc_GlobalData) {
        ImagesInc_GlobalData = mainModule; // reset ImagesInc_GlobalData in case an empty object was passed in    
    }
    return pageSections;
})(ImagesInc_GlobalData || {}, ImagesInc_PageSections || {}); // using Asynchronous sub-module
// Using loose augmentation to augment ImagesInc_GlobalData
// and tight augmentation to augment ImagesInc_PageSections
(function(mainModule, subModule) {
    //object definition for the index.html content area
    subModule.mainContentContainerDefObj = {
        imagesArray: ["Image_1.jpg", "Image_2.jpg", "Image_3.jpg",
            "Image_4.jpg", "Image_5.jpg", "Image_6.jpg",
            "Image_7.jpg", "Image_8.jpg", "Image_9.jpg"
        ]
    };
    mainModule.getIndexContentAreaImagesArray = function() {
        return subModule.mainContentContainerDefObj.imagesArray;
    };
})(ImagesInc_GlobalData || {}, ImagesInc_PageSections);