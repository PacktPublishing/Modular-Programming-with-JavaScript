var SandBox = function(Core, contextElem, componentSelector) {
    var containerElemContext = contextElem,
        componentID = componentSelector;
    return {
        getElement: function(elementID) {
            if (elementID && typeof elementID === "string") {
                return Core.getElement(elementID);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.getElement "
                );
            }
        },
        getElementInContext: function(elementID) {
            if (elementID && typeof elementID === "string") {
                return Core.getChildOfParentByID(containerElemContext,
                    elementID);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.getElementInContext"
                );
            }
        },
        getChildOfParent: function(parentElem, childID) {
            if (parentElem && childID && typeof childID === "string") {
                return Core.getChildOfParent(parentElem, childID);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.getChildOfParent"
                );
            }
        },
        updateElement: function(elementID, newStructure) {
            if (elementID && (typeof elementID === "string" || typeof elementID ===
                    'object') && newStructure && typeof newStructure ===
                "string") {
                Core.updateElement(elementID, newStructure);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.updateElement"
                );
            }
        },
        removeComponent: function(containerID) {
            if (containerID && typeof containerID === "string") {
                Core.updateElement(containerID, "");
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.removeComponent"
                );
            }
        },
        removeComponentFromDom: function(containerID) {
            if (containerID && typeof containerID === "string") {
                Core.removeComponentFromDom(containerID);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.removeComponentFromDom"
                );
            }
        },
        loadPage: function(url) {
            if (url && typeof url === 'string') {
                Core.loadPage(url);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.loadPage"
                );
            }
        },
        getParentNode: function(elem) {
            if (elem && typeof elem === 'object') {
                return Core.getParentNode(elem);
            } else {
                Core.log(3,
                    "incorrect parameter passed in; from SandBox.getParentNode"
                );
            }
        },
        applyElementCSSClass: function(elementID, className) {
            if (elementID && typeof elementID === "string" && className &&
                typeof className === "string") {
                Core.applyElementCSSClass(elementID, className);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.applyElementCSSClass"
                );
            }
        },
        addEventHandlerToElement: function(elementID, event, func) {
            if (elementID && typeof elementID === "string" && event &&
                typeof event === "string" && func && typeof func ===
                "function") {
                // we do this so we don't to traverse the whole DOM, thus increase performance
                var childElem = Core.getChildOfParentByID(
                    containerElemContext, elementID);
                Core.addEventHandlerToElement(childElem, event, func);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.addEventHandlerToElement"
                );
            }
        },
        addEventHandlerToParent: function(event, func) {
            // since we don't have the parent of the parent, then we just do the normal event handling attachment
            if (event && typeof event === "string" && func && typeof func ===
                "function") {
                Core.addEventHandlerToElement(containerElemContext,
                    event, func);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.addEventHandlerToParent"
                );
            }
        },
        removeEventHandlerFromParent: function(event, func) {
            if (event && typeof event === "string" && func && typeof func ===
                "function") {
                Core.removeEventHandlerFromElem(containerElemContext,
                    event, func);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.addEventHandlerToElement"
                );
            }
        },
        removeEventHandlerFromElem: function(elementID, event, func) {
            if (elementID && typeof elementID === "string" && event &&
                typeof event === "string" && func && typeof func ===
                "function") {
                // we do this so we don't to traverse the whole DOM, thus increase performance
                var childElem = Core.getChildOfParentByID(
                    containerElemContext, elementID);
                Core.removeEventHandlerFromElem(childElem, event, func);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.removeEventHandlerFromElem"
                );
            }
        },
        registerForCustomEvents: function(eventsObj) {
            if (eventsObj && typeof eventsObj === "object") {
                Core.registerForCustomEvents(componentID, eventsObj);
            } else {
                Core.log(3,
                    "incorrect parameter passed in; from SandBox.registerForCustomEvents"
                );
            }
        },
        publishCustomEvent: function(eventObj) {
            if (eventObj && typeof eventObj === "object") {
                Core.publishCustomEvent(eventObj);
            } else {
                Core.log(3,
                    "incorrect parameter passed in; from SandBox.publishCustomEvent"
                );
            }
        },
        unregisterCustomEvent: function(eventType) {
            if (eventType && typeof eventType === "string") {
                Core.unregisterCustomEvent(componentID, eventType);
            } else {
                Core.log(3,
                    "incorrect parameter passed in; from SandBox.unregisterCustomEvent"
                );
            }
        },
        unregisterAllCustomEvents: function() {
            if (Core.unregisterAllCustomEvents(componentID)) {
                Core.log(1, "All events for component " + componentID +
                    " have been removed; from SandBox.unregisterAllCustomEvents",
                    'green');
            } else {
                Core.log(2, "No custom events found for " + componentID +
                    " component; from SandBox.unregisterAllCustomEvents"
                );
            }
        },
        logMessage: function(severity, msg, color) {
            if (severity && typeof severity === "number" && msg &&
                typeof msg === "string") {
                Core.log(severity, msg, color);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.logMessage"
                );
            }
        },
        makeAjaxCall: function(apiURL, queryStr, method, callbackFunc) {
            if (apiURL && typeof apiURL === "string" && queryStr &&
                typeof queryStr === "string" && callbackFunc && typeof callbackFunc ===
                "function") {
                Core.makeAjaxCall(apiURL, queryStr, method,
                    callbackFunc);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.makeAjaxCall"
                );
            }
        },
        loadPageByAjax: function(apiURL, queryStr, callbackFunc, page,
            method) {
            if (apiURL && typeof apiURL === "string" && queryStr &&
                typeof queryStr === "string" && callbackFunc && typeof callbackFunc ===
                "function") {
                Core.loadPageByAjax(apiURL, queryStr, callbackFunc,
                    page, method);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.loadPageByAjax"
                );
            }
        },
        getJSONObj: function(apiURL, callbackFunc) {
            if (apiURL && typeof apiURL === "string" && callbackFunc &&
                typeof callbackFunc === "function") {
                Core.getJSONObj(apiURL, callbackFunc);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.getJSONObj"
                );
            }
        },
        addToHistory: function(data) {
            if (data && typeof data === "object") {
                Core.addToHistory(data);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.addToHistory"
                );
            }
        },
        populateCookie: function(cookieName, value) {
            if (cookieName && typeof cookieName === "string") {
                Core.CookieHandler.populateCookie(cookieName, value);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.populateCookie"
                );
            }
        },
        removeValueFromCookie: function(cookieName, value) {
            if (cookieName && typeof cookieName === "string" && value) {
                Core.removeValueByValueFromCookie(cookieName, value);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.removeValueFromCookie"
                );
            }
        },
        getValueAsArrayFromCookie: function(cookieName) {
            if (cookieName && typeof cookieName === "string") {
                return Core.getCookieValueAsArray(cookieName);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.getValueAsArrayFromCookie"
                );
            }
        },
        loadPageDefinitions: function() {
            Core.loadPageDefinitions();
        },
        loadFile: function(fileName, fileType, filePath) {
            if (fileName && typeof fileName === "string" && fileType &&
                typeof fileType === "string" && filePath && typeof filePath ===
                "string") {
                return Core.loadFile(fileName, fileType, filePath);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.LoadFile"
                );
            }
        },
        removeFile: function(fileName, fileType) {
            if (fileName && typeof fileName === "string" && fileType &&
                typeof fileType === "string") {
                Core.removeFile(fileName, fileType);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.removeFile"
                );
            }
        },
        getValueForKeyAsObjectFromStorage: function(key, decode) {
            if (key && typeof key === "string") {
                return Core.getValueForKeyAsObjectFromStorage(key,
                    decode);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.getValueForKeyAsObjectFromStorage"
                );
            }
        },
        setElementContext: function(elemID) {
            if (elemID && typeof elemID === "string") {
                containerElemContext = Core.getElement(elemID);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.setElementContext"
                );
            }
        },
        loadPageDefinitionsFileAndCallBack: function(callbackFunc) {
            if (callbackFunc && typeof callbackFunc === "function") {
                Core.loadPageDefinitionsFileAndCallBack(callbackFunc);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.loadPageDefinitionsFileAndCallBack"
                );
            }
        },
        getComponentObjAndCallback: function(favouritesPageObjDefID,
            callbackFunc) {
            if (favouritesPageObjDefID && typeof favouritesPageObjDefID ===
                'string' && callbackFunc && typeof callbackFunc ===
                "function") {
                Core.getComponentObjAndCallback(favouritesPageObjDefID,
                    callbackFunc);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.getComponentObjAndCallback"
                );
            }
        },
        loadComponent: function(componentID, callbackFunc) {
            if (componentID && typeof componentID === 'string' &&
                callbackFunc && typeof callbackFunc === "function") {
                Core.loadComponent(componentID, callbackFunc);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.loadComponent"
                );
            }
        },
        loadJSfileFromObjDefAndCallBack: function(fileName, filePath,
            callbackFunc) {
            if (fileName && typeof fileName === 'string' && filePath &&
                typeof filePath === 'string' && callbackFunc && typeof callbackFunc ===
                "function") {
                Core.loadJSfileFromObjDefAndCallBack(fileName, filePath,
                    callbackFunc);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.loadJSfileFromObjDefAndCallBack"
                );
            }
        },
        loadCSSfileFromObjDef: function(fileName, filePath) {
            if (fileName && typeof fileName === 'string' && filePath &&
                typeof filePath === 'string') {
                Core.loadCSSfileFromObjDef(fileName, filePath);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.loadCSSfileFromObjDef"
                );
            }
        },
        createDocumentLevelComponent: function(widgetInnerHTMLStr) {
            if (widgetInnerHTMLStr && typeof widgetInnerHTMLStr ===
                'string') {
                return Core.createDocumentLevelComponent(
                    widgetInnerHTMLStr);
            } else {
                Core.log(3,
                    "incorrect parameters passed in; from SandBox.createDocumentLevelComponent"
                );
            }
        }
    };
};