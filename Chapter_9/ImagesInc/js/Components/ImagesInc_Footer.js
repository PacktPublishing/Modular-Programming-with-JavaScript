ImagesInc_Core.registerComponent("footerContainer", "footer", function(sandBox) {
    return {
        init: function() {
            try {
                sandBox.updateElement("footerContainer",
                    ImagesInc_GlobalData.getFooterHTMLTxt());
                this.registerForEvents();
                sandBox.contextObj = this;
                sandBox.logMessage(1,
                    'Footer component has been initialized...',
                    'blue');
            } catch (e) {
                sandBox.logMessage(3,
                    'Footer component has NOT been initialized correctly --> ' +
                    e.message);
            }
        },
        destroy: function(removeComponent) {
            sandBox.contextObj.unregisterFromEvents();
            if (removeComponent) {
                sandBox.removeComponent("footerContainer");
            }
            sandBox.logMessage(1,
                'Footer component has been destroyed...',
                "blue");
        },
        registerForEvents: function() {
            sandBox.addEventHandlerToElement("latestNews", "click",
                this.handleLatestNewsClick);
            sandBox.addEventHandlerToElement("services", "click",
                this.handleServiceClick);
            sandBox.addEventHandlerToElement("support", "click",
                this.handleSupportClick);
        },
        unregisterFromEvents: function() {
            sandBox.removeEventHandlerFromElem("latestNews",
                "click", this.handleLatestNewsClick);
            sandBox.removeEventHandlerFromElem("services", "click",
                this.handleServiceClick);
            sandBox.removeEventHandlerFromElem("support", "click",
                this.handleSupportClick);
        },
        handleLatestNewsClick: function() {
            alert('Latest News has been clicked');
        },
        handleServiceClick: function() {
            alert('Services has been clicked');
        },
        handleSupportClick: function(e) {
            sandBox.publishCustomEvent({
                type: 'support-Clicked',
                data: "support"
            });
            e.preventDefault();
            e.stopPropagation();
        }
    };
});