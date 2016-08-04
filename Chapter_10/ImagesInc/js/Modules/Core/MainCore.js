var ImagesInc_Core = (function(mainCore) {
    var $ = null,
        registeredModules = [],
        registeredComponents = [],
        fileLoadDelayTime = 300,
        timerCounter = 0,
        recursiveMaxCounter = 3,
        loadedComponentName, loadedComponentcallbackFunc;
    mainCore.registeredComponents = registeredComponents;
    mainCore.jQuery;
    //core initializing itsself
    (function Core_initialize() {
        mainCore.debug = true;
        try {
            // get jQuery from the base module loader
            mainCore.jQuery = $ = ImagesInc_Base.getBaseModule();
        } catch (e) {
            if (mainCore.debug) {
                console.error('Base Module has not been defined!!!');
            }
        }
        if (mainCore.debug) {
            console.log("%c Core Module has been initialized...",
                "color:blue");
        }
    })();
    mainCore.toggleDebug = function() {
        mainCore.debug = !mainCore.debug;
        if (mainCore.debug) {
            mainCore.log(1,
                "Application debug has been turned on...",
                "blue");
        } else {
            console.log(
                "%c Application debug has been turned off...",
                "color:orange");
        }
    };
    mainCore.getDebugFlag = function() {
        return mainCore.debug;
    };
    //progressive enhancement
    mainCore.log = function(severity, msg, color) {
        // if the logging module has been loaded, then use its full functionality
        // otherwise just log a simple message
        if (mainCore.LoggingHandler && mainCore.LoggingHandler.logMessage) {
            mainCore.LoggingHandler.logMessage(severity, msg, color);
        } else {
            if (severity === 3) {
                color = "color:red;font-weight:bold";
            }
            console['log']("%c Severity: " + severity + " ---> " +
                msg + " (From Core!)", color);
        }
    };
    mainCore.checkIfArray = function(value) {
        if (mainCore.Utilitizes && mainCore.Utilitizes.checkIfArray) {
            return mainCore.Utilitizes.checkIfArray(value);
        } else {
            mainCore.log(3,
                "cannot check if array; from mainCore.checkIfArray"
            );
        }
    };
    mainCore.testLocalStorage = function() {
        if (mainCore.Utilitizes && mainCore.Utilitizes.testLocalStorage) {
            return mainCore.Utilitizes.testLocalStorage();
        } else {
            mainCore.log(3,
                "cannot check if array; from mainCore.testLocalStorage"
            );
        }
    };
    mainCore.registerModule = function(module) {
        registeredModules.push(module);
    };
    mainCore.getAppModulesCount = function() {
        return mainCore.registeredModules.length;
    };
    mainCore.removeRegisteredModule = function(index) {
        mainCore.registeredModules.splice(index, 1);
    };
    mainCore.initializeAllModules = function() {
        for (var module in registeredModules) {
            registeredModules[module].initialize();
        }
    };
    mainCore.registerComponent = function(containerID, componentID,
        createFunc) {
        var containerElem, componentObj;
        //setting context for the sandbox
        if ($) {
            containerElem = $("#" + containerID)[0];
        } else {
            containerElem = document.getElementById(containerID);
        }
        if (createFunc && typeof createFunc === 'function') {
            componentObj = createFunc(new SandBox(this,
                containerElem, componentID));
            //checking for required methods in component
            if (componentObj.init && typeof componentObj.init ===
                'function' && componentObj.destroy && typeof componentObj
                .destroy === 'function') {
                componentObj.id = componentID;
                registeredComponents.push(componentObj);
            } else {
                this.log(3,
                    "Component does not have necessary methods, thus not registered"
                );
            }
        } else {
            this.log(3,
                "no creator function on component, component not registered"
            );
        }
    };
    mainCore.getComponentByID = function(componentID) {
        for (var i = 0; i < this.registeredComponents.length; i++) {
            if (this.registeredComponents[i].id === componentID) {
                return this.registeredComponents[i];
            }
        }
        return false;
    };
    mainCore.unregisterComponentByName = function(name) {
        for (var component in registeredComponents) {
            if (component.name === name) {
                component = null;
            }
        }
    };
    mainCore.resetComponentInfo = function() {
        timerCounter = 0;
        loadedComponentcallbackFunc = null;
    };
    mainCore.initializeComponent = function(componentID, callbackFunc) {
        var args = arguments;
        try {
            timerCounter++;
            // see if the Component has been loaded
            mainCore.getComponentByID(componentID).init();
            callbackFunc();
            mainCore.resetComponentInfo();
        } catch (e) {
            if (timerCounter < recursiveMaxCounter) {
                window.setTimeout(function() {
                    mainCore.initializeComponent.apply(null,
                        args);
                }, fileLoadDelayTime);
            } else {
                mainCore.resetComponentInfo();
                mainCore.log(3,
                    " could not initialize the loaded Component"
                );
            }
        }
    };
    mainCore.loadComponent = function(ComponentDefID, callbackFunc) {
        // get the value of Component object defintion from storage
        var ComponentDef = mainCore.getValueForKeyAsObjectFromStorage(
            ComponentDefID);
        loadedComponentcallbackFunc = callbackFunc;
        if (!ComponentDef) {
            // if Component defintion is not in the storage then the page object definitions probably needs to be loaded
            mainCore.loadPageDefinitionsFileAndCallBack(function() {
                mainCore.getComponentObjAndCallback(
                    ComponentDefID, mainCore.loadComponentFilesAndInitializeWithCallBack
                );
            });
        } else {
            mainCore.loadComponentFilesAndInitializeWithCallBack(
                ComponentDef);
        }
    };
    mainCore.loadPageDefinitionsFileAndCallBack = function(callbackFunc) {
        var pageDefinitionsFileName = ImagesInc_GlobalData.getPageDefinitionsFileName(),
            pageDefinitionsFilePath = ImagesInc_GlobalData.getPageDefinitionsFilePath();
        if (mainCore.Utilitizes && mainCore.Utilitizes.Load_JS_CSS &&
            pageDefinitionsFileName && pageDefinitionsFilePath) {
            mainCore.Utilitizes.Load_JS_CSS(pageDefinitionsFileName,
                "js", pageDefinitionsFilePath);
            if (mainCore.confirmFileLoad(pageDefinitionsFileName,
                "js")) {
                callbackFunc();
                mainCore.Utilitizes.Remove_JS_CSS(
                    pageDefinitionsFileName, "js");
            } else {
                mainCore.log(3,
                    "Cannot load file; from mainCore.loadPageDefinitionsFileAndCallBack"
                );
            }
        } else {
            mainCore.log(3,
                "Cannot load file; from mainCore.loadPageDefinitionsFileAndCallBack"
            );
        }
    };
    mainCore.getComponentObjAndCallback = function(ComponentObjID,
        callbackFunc) {
        try {
            // load Component object defintion from storage
            mainCore.loadPageDefinitionFromStorageAndCallBack(
                ComponentObjID, callbackFunc);
        } catch (e) {
            mainCore.log(3,
                'Component defintion was not found; from mainCore.getComponentObjAndLoad ' +
                e.message);
        }
    };
    mainCore.loadPageDefinitionFromStorageAndCallBack = function(
        pageObjDefName, callbackFunc) {
        var pageDefinitionObj, args = arguments;
        pageDefinitionObj = mainCore.getValueForKeyAsObjectFromStorage(
            pageObjDefName);
        if (!pageDefinitionObj && timerCounter <
            recursiveMaxCounter) {
            timerCounter++;
            window.setTimeout(function() {
                mainCore.loadPageDefinitionFromStorageAndCallBack
                    .apply(null, args);
            }, fileLoadDelayTime);
        } else if (timerCounter >= recursiveMaxCounter) {
            timerCounter = 0;
            throw new Error('Page defintion Object was not found');
        } else {
            timerCounter = 0;
            callbackFunc(pageDefinitionObj);
        }
    };
    mainCore.loadJSfileFromObjDefAndCallBack = function(fileName,
        filePath, callbackFunc) {
        // if file has already been loaded, then nothing to do
        if (mainCore.confirmFileLoad(fileName, "js")) {
            return true;
        } else {
            mainCore.loadFileAndCallBack(fileName, "js", filePath,
                callbackFunc);
        }
    };
    // if file has already been loaded, then nothing to do
    mainCore.loadCSSfileFromObjDef = function(fileName, filePath) {
        if (mainCore.confirmFileLoad(fileName, "css")) {
            return true;
        } else {
            mainCore.loadFile(fileName, "css", filePath);
        }
    };
    mainCore.loadComponentFilesAndInitializeWithCallBack = function(
        pageDefinitionObj, callbackFunc) {
        loadedComponentcallbackFunc = callbackFunc ||
            loadedComponentcallbackFunc;
        if (pageDefinitionObj && typeof pageDefinitionObj ===
            "object") {
            if (pageDefinitionObj.scriptFile && pageDefinitionObj.scriptPath) {
                mainCore.loadJSfileFromObjDefAndCallBack(
                    pageDefinitionObj.scriptFile,
                    pageDefinitionObj.scriptPath, function() {
                        mainCore.initializeComponent(
                            pageDefinitionObj.componentID,
                            loadedComponentcallbackFunc);
                    });
            } else {
                mainCore.log(2,
                    'Could not load Component script file; from mainCore.loadComponentFilesAndInitializeWithCallBack'
                );
                return;
            }
            if (pageDefinitionObj.cssFile && pageDefinitionObj.cssPath) {
                mainCore.loadCSSfileFromObjDef(pageDefinitionObj.cssFile,
                    pageDefinitionObj.cssPath);
            } else {
                mainCore.log(2,
                    'Could not load Component script file; from mainCore.loadComponentFilesAndInitializeWithCallBack'
                );
            }
        } else {
            mainCore.log(3,
                'Component defintion was not found, cannot render page; from mainCore.loadComponentFilesAndInitializeWithCallBack'
            );
        }
    };
    mainCore.loadPageDefinitions = function() {
        var pageDefinitionsFileName = ImagesInc_GlobalData.getPageDefinitionsFileName(),
            pageDefinitionsFilePath = ImagesInc_GlobalData.getPageDefinitionsFilePath();
        if (mainCore.Utilitizes && mainCore.Utilitizes.Load_JS_CSS &&
            pageDefinitionsFileName && pageDefinitionsFilePath) {
            mainCore.Utilitizes.Load_JS_CSS(pageDefinitionsFileName,
                "js", pageDefinitionsFilePath);
            mainCore.Utilitizes.Remove_JS_CSS(
                pageDefinitionsFileName, "js");
        } else {
            mainCore.log(3,
                "Cannot load file; from mainCore.loadPageDefinitions"
            );
        }
    };
    mainCore.confirmFileLoad = function(fileName, fileType) {
        var fileLoaded;
        if (mainCore.Utilitizes && mainCore.Utilitizes.getFileInHead) {
            fileLoaded = mainCore.Utilitizes.getFileInHead(fileName,
                fileType);
            if (!fileLoaded && timerCounter < recursiveMaxCounter) {
                timerCounter++;
                window.setTimeout(mainCore.confirmFileLoad,
                    fileLoadDelayTime, fileName, fileType);
            } else if (timerCounter >= recursiveMaxCounter) {
                mainCore.log(3,
                    "Page has not been loaded; from confirmFileLoad"
                );
                timerCounter = 0;
                return false;
            } else {
                timerCounter = 0;
                return true;
            }
        } else {
            console.log(3,
                "Cannot look for file in loaded page; confirmFileLoad"
            );
            return false;
        }
    };
    mainCore.loadFileAndCallBack = function(fileName, fileType,
        filePath, callbackFunc) {
        if (mainCore.Utilitizes && mainCore.Utilitizes.Load_JS_CSS) {
            mainCore.Utilitizes.Load_JS_CSS(fileName, fileType,
                filePath);
            if (mainCore.confirmFileLoad(fileName, fileType)) {
                callbackFunc();
            } else {
                mainCore.log(3,
                    "Cannot load file; from mainCore.loadFileAndCallBack"
                );
            }
        } else {
            mainCore.log(3,
                "Cannot load file; from mainCore.loadFileAndCallBack"
            );
        }
    };
    mainCore.loadFile = function(fileName, fileType, filePath) {
        if (mainCore.Utilitizes && mainCore.Utilitizes.Load_JS_CSS) {
            mainCore.Utilitizes.Load_JS_CSS(fileName, fileType,
                filePath);
        } else {
            mainCore.log(3,
                "Cannot load file; from mainCore.loadFiles");
        }
    };
    mainCore.removeFile = function(fileName, fileType) {
        if (mainCore.Utilitizes && mainCore.Utilitizes.Load_JS_CSS) {
            mainCore.Utilitizes.Remove_JS_CSS(fileName, fileType);
        } else {
            mainCore.log(3,
                "Cannot remove file; from mainCore.removeFile");
        }
    };
    mainCore.removeValueByValueFromCookie = function(cookieName, value) {
        if (mainCore.CookieHandler && mainCore.CookieHandler.removeValueByValue) {
            mainCore.CookieHandler.removeValueByValue(cookieName,
                value);
        } else {
            mainCore.log(3,
                "Cannot remove Value from cookie; from mainCore.removeValueByValue"
            );
        }
    };
    mainCore.getCookieValueAsArray = function(cookieName) {
        if (mainCore.CookieHandler && mainCore.CookieHandler.getCookieValueAsArray) {
            return mainCore.CookieHandler.getCookieValueAsArray(
                cookieName);
        } else {
            mainCore.log(3,
                "Cannot get Value for cookie; from mainCore.getCookieValueAsArray"
            );
        }
    };
    mainCore.getValueForKeyAsObjectFromStorage = function(ObjName) {
        if (mainCore.StorageHandler && mainCore.StorageHandler.getValueForKeyAsObject) {
            return mainCore.StorageHandler.getValueForKeyAsObject(
                ObjName);
        } else {
            mainCore.log(3,
                "Cannot get Value as object from storage; from mainCore.getValueForKeyAsObjectFromStorage"
            );
        }
    };
    mainCore.saveValueToLocalStorage = function(key, value, encode) {
        if (mainCore.StorageHandler && mainCore.StorageHandler.saveValueToLocalStorage &&
            key && typeof key === "string" && value) {
            mainCore.StorageHandler.saveValueToLocalStorage(key,
                value, encode);
        } else {
            mainCore.log(3,
                "Cannot set value in local storage; from mainCore.saveValueToLocalStorage"
            );
        }
    };
    mainCore.initializeAllComponents = function() {
        this.log(1, "Initializing all components...", "orange");
        try {
            for (var i = 0; i < registeredComponents.length; i++) {
                registeredComponents[i].init();
            }
        } catch (e) {
            this.log(3, 'APPLICATION CATASTROPHIC ERROR!' + e.name +
                ": " + e.message);
        }
        this.log(1, "All components have been initialized...",
            "orange");
    };
    mainCore.destroyAllComponents = function(removeFromDom) {
        this.log(1, "Destroying all components...", "orange");
        var lastIndex = registeredComponents.length - 1;
        try {
            for (var i = lastIndex; i >= 0; i--) {
                registeredComponents[i].destroy(removeFromDom);
            }
        } catch (e) {
            this.log(3, 'APPLICATION Destroy error!' + e.name +
                ": " + e.message);
        }
        this.log(1, "All components have been destroyed...",
            "orange");
    };
    //unit tests can still run even if the application fails catastrophically
    mainCore.runAllUnitTests = function() {
        if (typeof ImagesInc_Core.AppTester !== 'undefined') {
            try {
                ImagesInc_Core.AppTester.runAllUnitTests();
            } catch (e) {
                mainCore.log(3, 'AppTester ERROR! ' + e.name + ": " +
                    e.message);
            }
        } else {
            mainCore.log(3, 'AppTester not available! ');
        }
    };
    return mainCore;
})(ImagesInc_Core || {}); // using loose augmentation of ImagesInc_Core
// DOM related functionality
var ImagesInc_Core = (function(Core) {
    var $ = Core.jQuery;
    var insertHTMLTxt = function(containerID, newStructure) {
        var containerElem;
        if (typeof containerID === 'string') {
            containerElem = Core.getElement(containerID);
        } else if (typeof containerID === 'object') {
            containerElem = containerID;
        }
        if (containerElem) {
            Core.setInnerHTML(containerElem, newStructure);
        } else {
            Core.log(3,
                'Cannot set the innerHTML of an unfound element; insertHTMLTxt'
            );
        }
    };
    var applyElementCSSClass = function(elementID, className) {
        var elem;
        if (!className) {
            Core.log(3,
                'No class name has been provided, exiting module!'
            );
            return false;
        }
        elem = Core.getElement(elementID);
        Core.setClassName(elem, className);
    };
    var getParentNode = function(elem) {
        if ($) {
            return $(elem).parent()[0];
        } else {
            return elem.parentNode;
        }
    };
    var getElement = function(elemID) {
        if ($) {
            return $("#" + elemID)[0];
        } else {
            return document.getElementById(elemID);
        }
    };
    var setInnerHTML = function(container, newStructure) {
        if ($) {
            try { // to deal with jQuery 1.8 error when component is generated dynamically
                $(container).html(newStructure);
            } catch (e) {
                container.innerHTML = newStructure;
            }
        } else {
            container.innerHTML = newStructure;
        }
    };
    var setClassName = function(elem, className) {
        if ($) {
            $(elem).addClass(className);
        } else {
            elem.className = className;
        }
    };
    //we do context to improve performance    
    var getChildOfParentByID = function(parentElem, childID) {
        childID = "#" + childID;
        if ($) {
            try {
                return $(parentElem).find(childID)[0];
            } catch (e) {
                return parentElem.querySelector(childID);
            }
        } else {
            return parentElem.querySelector(childID);
        }
    };
    // graceful degradation and progressive enhancement
    var removeComponentFromDom = function(elementID) {
        var childElem;
        elementID = "#" + elementID;
        if ($) {
            $(elementID).detach();
        } else {
            childElem = document.querySelector(elementID);
            childElem.parentNode.removeChild(childElem);
        }
    };
    var createDocumentLevelComponent = function(compnentViewStr) {
        var mainComponentContainer;
        mainComponentContainer = document.createElement("DIV");
        mainComponentContainer.innerHTML = compnentViewStr;
        document.body.appendChild(mainComponentContainer);
        return mainComponentContainer;
    };
    //sandbox only talks to this interface of maincore
    Core.updateElement = insertHTMLTxt;
    Core.applyElementCSSClass = applyElementCSSClass;
    Core.getParentNode = getParentNode;
    Core.getElement = getElement;
    Core.setInnerHTML = setInnerHTML;
    Core.setClassName = setClassName;
    Core.getChildOfParentByID = getChildOfParentByID;
    Core.removeComponentFromDom = removeComponentFromDom;
    Core.createDocumentLevelComponent = createDocumentLevelComponent;
    return Core;
})(ImagesInc_Core); // using tight augmentation
// event related functionality augmentation
var ImagesInc_Core = (function(Core) {
    var $ = Core.jQuery;
    var addEventHandlerToElem = function(elem, event, callbackFunc) {
        if (!elem) {
            Core.log(3,
                'elem is not passed in, from addEventHandlerToElem'
            );
            throw new Error('Element not found');
        }
        if ($) {
            $(elem).on(event, callbackFunc);
        } else {
            if (elem.addEventListener) {
                elem.addEventListener(event, callbackFunc);
            } else if (elem.attachEvent) { // For IE 8 and earlier versions
                elem.attachEvent("on" + event, callbackFunc);
            }
        }
    };
    var removeEventHandlerFromElem = function(elem, event, callbackFunc) {
        if (!elem) {
            Core.log(3,
                'Element is not found, from addEventHandlerToElem'
            );
            throw new Error('Element not found');
        }
        if ($) {
            $(elem).off(event, callbackFunc);
        } else {
            if (elem.removeEventListener) {
                elem.removeEventListener(event, callbackFunc);
            } else if (elem.detachEvent) { // For IE 8 and earlier versions
                elem.detachEvent("on" + event, callbackFunc);
            }
        }
    };
    //registering and publishing events
    var registerForCustomEvents = function(componentID, eventsObj) {
        if (typeof componentID === 'string' && typeof eventsObj ===
            'object') {
            for (var i = 0; i < Core.registeredComponents.length; i++) {
                if (Core.registeredComponents[i].id === componentID) {
                    Core.registeredComponents[i].events = eventsObj;
                }
            }
        } else {
            Core.log(3,
                'Incorrect parameters passed in, from registerForCustomEvents'
            );
        }
    };
    var publishCustomEvent = function(eventObj) {
        for (var i = 0; i < Core.registeredComponents.length; i++) {
            if (Core.registeredComponents[i].events && Core.registeredComponents[
                i].events[eventObj.type]) {
                Core.registeredComponents[i].events[eventObj.type](
                    eventObj.data);
            }
        }
    };
    var unregisterCustomEvent = function(componentID, eventType) {
        if (typeof componentID === 'string' && typeof eventType ===
            'string') {
            for (var i = 0; i < Core.registeredComponents.length; i++) {
                if (Core.registeredComponents[i].id === componentID) {
                    if (Core.registeredComponents[i].events[
                        eventType]) {
                        delete Core.registeredComponents[i].events[
                            eventType];
                        Core.log(1, 'Event "' + eventType +
                            '" for "' + componentID +
                            '" component has been turned off',
                            "blue");
                        return true;
                    } else {
                        Core.log(1, '"' + componentID +
                            '" component was not registered for ' +
                            'Event "' + eventType + '"',
                            "orange");
                        return false;
                    }
                }
            }
            Core.log(3, '"' + componentID +
                '" component was not found; unregisterCustomEvent'
            );
            return false;
        } else {
            Core.log(3,
                " incorrect pareameters have been passed in, from unregisterCustomEvent"
            );
        }
    };
    var unregisterAllCustomEvents = function(componentID) {
        if (typeof componentID === 'string') {
            for (var i = 0; i < Core.registeredComponents.length; i++) {
                if (Core.registeredComponents[i] && Core.registeredComponents[
                    i].id) {
                    if (Core.registeredComponents[i].id ===
                        componentID && Core.registeredComponents[i]
                        .events) {
                        delete Core.registeredComponents[i].events;
                        return true;
                    }
                }
            }
        } else {
            Core.log(3,
                'Incorrect parameters passed in, from unregisterCustomEvent'
            );
        }
    };
    var addToHistory = function(dataObj) {
        // if history object is supported
        if (!!(window.history && history.pushState)) {
            history.pushState(dataObj, dataObj.url, dataObj.url);
        } else {
            alert(
                'Your browser needs to be upgraded to the latest version'
            );
            Core.log(3,
                "History API is not supported; from addToHistory"
            );
        }
    };
    var getFromHistory = function(e) {
        // if history object is supported
        if (!!(window.history && history.pushState)) {
            if (e.state) {
                Core.handlePageChange(e.state.url);
            } else if (e.originalEvent && e.originalEvent.state) { // to get the original event in case of jQuery
                Core.handlePageChange(e.originalEvent.state.url);
            } else {
                Core.log(2,
                    "Could not get the state of event from history object"
                );
            }
        } else {
            alert(
                'Your browser needs to be upgraded to the latest version'
            );
            Core.log(3,
                "History API is not supported; from getFromHistory"
            );
        }
    };
    var loadPage = function(url) {
        location.href = url;
    };
    // binding popstate event to getFromHistory method
    addEventHandlerToElem(window, 'popstate', getFromHistory);
    Core.addEventHandlerToElement = addEventHandlerToElem;
    Core.removeEventHandlerFromElem = removeEventHandlerFromElem;
    Core.registerForCustomEvents = registerForCustomEvents;
    Core.publishCustomEvent = publishCustomEvent;
    Core.unregisterCustomEvent = unregisterCustomEvent;
    Core.unregisterAllCustomEvents = unregisterAllCustomEvents;
    Core.addToHistory = addToHistory;
    Core.getFromHistory = getFromHistory;
    Core.loadPage = loadPage;
    return Core;
})(ImagesInc_Core); // using tight augmentation
//we seperate sub-modules in core based on functionality for easy maintenance
// AJAX functionality related augmentation
var ImagesInc_Core = (function(Core) {
    var $ = Core.jQuery;
    Core.makeAjaxCall = function(url, theQuery, method, handler) {
        if ($ && Core.jQueryAjaxEngine && Core.jQueryAjaxEngine.makeAjaxCall) {
            Core.jQueryAjaxEngine.makeAjaxCall(url, theQuery,
                method, handler);
        } else {
            Core.log(3, "Cannot make Ajax call!; from makeAjaxCall");
        }
    };
    Core.loadPageByAjax = function(apiURL, QueryStr, callbackFunc, page,
        method) {
        if ($ && Core.jQueryAjaxEngine && Core.jQueryAjaxEngine.loadPageByAjax) {
            Core.jQueryAjaxEngine.loadPageByAjax(apiURL, QueryStr,
                callbackFunc, page, method);
        } else {
            Core.log(3,
                "Cannot make Ajax call!; from loadPageByAjax");
        }
    };
    Core.getJSONObj = function(url, callbackFunc) {
        if ($ && Core.jQueryAjaxEngine && Core.jQueryAjaxEngine.getJSONObj) {
            Core.jQueryAjaxEngine.getJSONObj(url, callbackFunc);
        } else {
            Core.log(3, "Cannot make Ajax call!!; from getJSONObj");
        }
    };
    return Core;
})(ImagesInc_Core); // using tight augmentation
// custom event handlers in core, core registering for events
var ImagesInc_Core = (function(Core) {
    Core.handleImageClick = function(data) {
        Core.log(1, "  we Got click from image", "green");
    };
    Core.handleFavlinkClick = function(data) {
        Core.log(1, "  we Got click from Link", "green");
    };
    //broadcasting that the page has changed
    Core.handlePageChange = function(pageURL) {
        Core.publishCustomEvent({
            type: 'page-Changed',
            data: pageURL
        });
    };
    var events = {
        "FavLink-Clicked": Core.handleFavlinkClick,
        "FavImg-Clicked": Core.handleImageClick
    };
    Core.registeredComponents.push(Core);
    // to be initialized as a component
    Core.init = function() {
        Core.id = "mainCore";
        Core.registerForCustomEvents("mainCore", events);
        Core.log(1, 'Core is listening to custom events now...',
            'purple');
    };
    Core.destroy = function() {
        Core.log(1, 'Core has been destroyed...', 'purple');
        delete Core.registeredComponents[0];
    };
    //adding the index to history on the first load of the page
    history.replaceState({
        url: location.pathname
    }, location.pathname, location.pathname); // add current page to history object
    return Core;
})(ImagesInc_Core);