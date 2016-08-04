// using simple sub-module augmentation
ImagesInc_Core.NotificationHandler = (function() {
    var self = {},
        NotificationWidgetDef, NotificationWidgetObj;
    // initialize as a core sub-modules
    self.initialize = function() {
        this.id = "Notification";
        ImagesInc_Core.registeredComponents.push(this);
        ImagesInc_Core.log(1,
            'NotificationHandler Module has been initialized...',
            "blue");
    };
    // initialize as a component 
    self.init = function() {
        ImagesInc_Core.registerForCustomEvents("Notification", {
            'support-Clicked': this.handleSupportClick
        });
        ImagesInc_Core.log(1,
            'NotificationHandler is listening to custom events now...',
            'purple');
    };
    self.destroy = function() {
        ImagesInc_Core.unregisterAllCustomEvents("Notification");
        ImagesInc_Core.log(1,
            'NotificationHandler has been destroyed...',
            'purple');
    };
    self.handleSupportClick = function() {
        // name of the component when it registers itselft with core is used here
        NotificationWidgetObj = ImagesInc_Core.getComponentByID(
            "notificationWidget");
        if (!NotificationWidgetObj) {
            ImagesInc_Core.loadComponent(ImagesInc_GlobalData.getNoficationWidgetDefID(),
                self.renderWidget);
        } else {
            self.renderWidget();
        }
    };
    self.renderWidget = function() {
        ImagesInc_Core.getComponentByID("notificationWidget")
            .renderWidget();
    };
    // register with MainCore
    self.register = (function() {
        ImagesInc_Core.registerModule(self);
    })();
    return {
        handleSupportClick: self.handleSupportClick
    };
})();