(function() {
    var FavouritesPageDefinition = {
        pageID: "Favourites",
        htmlStr: "<div id='favouritedHeader'><h3>Your Favorite Images</h3></div>",
        cssFile: "FavoritesView.css",
        cssPath: "css/"
    };
    var NotificationWidgetDefinition = {
        componentID: "notificationWidget",
        scriptFile: "NotificationWidget.js",
        scriptPath: "/js/Widgets/",
        cssFile: "NotificationWidget.css",
        cssPath: "css/"
    };
    ImagesInc_Core.saveValueToLocalStorage(ImagesInc_GlobalData.getFavouritesPageObjDefID(),
        FavouritesPageDefinition);
    ImagesInc_Core.saveValueToLocalStorage(ImagesInc_GlobalData.getNoficationWidgetDefID(),
        NotificationWidgetDefinition);
})();