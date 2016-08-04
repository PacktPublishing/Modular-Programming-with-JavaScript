// using this to run Jasmine unit tests but shouldn't be for production
// and not really part of the project for chapter 10, it is here just to see the tests
var globalCookieHandler = (function() {
    var self = {},
        cookieLifeSpan = "90",
        cookieDelimiter = "~",
        pathValue = "/",
        domainValue = "",
        cookieValueArray = null,
        cookieEncodeFlag = false;
    self.getCookieDelimiter = function() {
        return cookieDelimiter;
    };
    self.setCookieDelimiter = function(delimiter) {
        cookieDelimiter = delimiter;
    };
    self.getCookieLifeSpan = function() {
        return cookieLifeSpan;
    };
    self.setCookieLifeSpan = function(lifeSpan) {
        cookieLifeSpan = lifeSpan;
    };
    self.getCookieDomainValue = function() {
        return domainValue;
    };
    self.setCookieLifeSpan = function(domainVal) {
        domainValue = domainVal;
    };
    self.getPathValue = function() {
        return pathValue;
    };
    self.setPathValue = function(pValue) {
        if (pValue) {
            pathValue = pvalue;
        }
    };
    self.getEncode_Decode = function(optionalFlag) {
        if (!optionalFlag && optionalFlag !== false) {
            return cookieEncodeFlag;
        } else {
            return optionalFlag;
        }
    };
    self.activateEncoding = function(decodeFlag) {
        cookieEncodeFlag = decodeFlag;
    };
    self.getDomainCookieList = function() {
        if (document.cookie) {
            return document.cookie.split(';');
        }
        return null;
    };
    self.resetCookieLifeSpan = function(cookieName, lifeSpan,
        Opt_decodeFlag) {
        self.createCookie(cookieName, self.getCookieValueAsString(
                cookieName, Opt_decodeFlag), lifeSpan, null,
            null, null, Opt_decodeFlag);
    };
    // creates the cookie if it doesn't exist, if it does, then adds the value to the cookie
    self.populateCookie = function(cookieName, value, duration,
        Opt_encodeFlag) {
        var cookieLife = null,
            encode_decodeFlag;
        if (!cookieName || !value) {
            console.log(
                'Missing parameters for populateCookie method.'
            );
            return false;
        }
        encode_decodeFlag = self.getEncode_Decode(Opt_encodeFlag);
        // if there is a duration has been set for the cookie, then use that, if purposly setting the cookie with empty string, then it is session cookie
        if (duration) {
            cookieLifeSpan = duration;
        } else {
            cookieLifeSpan === ""; // create session cookie
        }
        // if the cookie doesn't exit, create it with the value passed
        if (!self.getCookieValueAsString(cookieName,
            encode_decodeFlag)) {
            self.createCookie(cookieName, value, cookieLifeSpan,
                null, domainValue, null, encode_decodeFlag);
        } else { //if the cookie exists, add the new value to the other values for the cookie, if not duplicate
            // if the value was not added to the cookie
            if (!self.addValueToCookie(cookieName, value,
                cookieLife)) {
                return false;
            }
        }
        return true;
    };
    //Adds a value to the cookie, If the cookie does not exit, it retuns null, if it does not have the value, returns false
    self.addValueToCookie = function(cookieName, value, Opt_encodeFlag) {
        if (!cookieName || !value) {
            console.log(
                'Missing parameters for addValueToCookie method.'
            );
            return false;
        }
        var valueInCookie = null,
            cookieValueStr, encode_decodeFlag;
        encode_decodeFlag = self.getEncode_Decode(Opt_encodeFlag);
        valueInCookie = self.findValueInCookie(cookieName, value,
            encode_decodeFlag);
        //if didn't find the value in the cookie but the cookie does exist, then add the value to the cookie
        if (valueInCookie === false) {
            cookieValueStr = self.getCookieValueAsString(cookieName,
                encode_decodeFlag);
            cookieValueStr += self.getCookieDelimiter() + value;
            self.createCookie(cookieName, cookieValueStr,
                cookieLifeSpan, null, null, null,
                encode_decodeFlag);
            return true;
        } else if (valueInCookie === null) { // if the cookie does not exist
            return null;
        } else { // found the value in the cookie, so don't duplicate it.
            return false;
        }
    };
    self.findValueInCookie = function(cookieName, value, Opt_decodeFlag) {
        if (!cookieName || !value) {
            console.log(
                'Missing parameters for findValueInCookie method.'
            );
            return false;
        }
        var valueArray = null,
            indexValue, encode_decodeFlag;
        encode_decodeFlag = self.getEncode_Decode(Opt_decodeFlag);
        //if the cookie exists, then get all the values from the string
        valueArray = self.getCookieValueAsArray(cookieName,
            encode_decodeFlag);
        cookieValueArray = null;
        if (valueArray) {
            for (var i = 0; i < valueArray.length; i++) {
                indexValue = valueArray[i];
                if (indexValue.substring(0, indexValue.length) ===
                    value) {
                    cookieValueArray = valueArray;
                    return true; // the value exists in the cookie
                }
            }
            //the value in the cookie is not found
            return false;
        } else {
            return null; // the cookie did not exit
        }
    };
    // adds a cookie to the browser with the specified name, value and expiry date
    self.createCookie = function(cookieName, value, Opt_days, Opt_path,
        Opt_domain, Opt_secureFlag, Opt_encodeFlag) {
        var expires = null,
            secure = null,
            domainName = null,
            domainPath = null,
            cookieStr = null,
            encode_decodeFlag;
        if (!cookieName || !value && value !== "") {
            console.log(
                'Missing parameters for createCookie method.');
            return false;
        }
        encode_decodeFlag = self.getEncode_Decode(Opt_encodeFlag);
        if (encode_decodeFlag) {
            cookieName = encodeURIComponent(cookieName);
            value = encodeURIComponent(value) + "; ";
        } else {
            value = value + "; ";
        }
        if (Opt_days) {
            var date = new Date();
            date.setTime(date.getTime() + (Opt_days * 24 * 60 * 60 *
                1000));
            expires = "expires=" + date.toGMTString() + "; ";
        } else {
            // create session cookie
            expires = "";
        }
        if (Opt_domain) {
            domainName = "domain=" + Opt_domain + "; ";
        } else {
            domainName = "domain=" + domainValue + "; ";
        }
        if (Opt_path) {
            domainPath = "path=" + Opt_path + "; ";
        } else {
            domainPath = "path=" + pathValue + "; ";
        }
        if (Opt_secureFlag) {
            secure = "secure";
        } else {
            secure = "";
        }
        cookieStr = cookieName + "=" + value + expires + domainName +
            domainPath + secure;
        document.cookie = cookieStr;
    };
    // returns the value string of a cookie 
    self.getCookieValueAsString = function(cookieName, Opt_decodeFlag) {
        if (!cookieName) {
            console.log(
                'No cookie name provided to getCookieValueAsString, exiting with error'
            );
            return false;
        }
        var passedCookieName = cookieName,
            theDecodedCookieName = null,
            theStoredCookie = null,
            theStroedCookieValue = null,
            cookiesList = self.getDomainCookieList(),
            encode_decodeFlag;
        if (!cookiesList) {
            return false;
        }
        encode_decodeFlag = self.getEncode_Decode(Opt_decodeFlag);
        for (var i = 0; i < cookiesList.length; i++) {
            if (encode_decodeFlag) {
                theStoredCookie = decodeURIComponent(cookiesList[i]);
            } else {
                theStoredCookie = cookiesList[i];
            }
            theDecodedCookieName = theStoredCookie.substring(0,
                theStoredCookie.indexOf("="));
            // removed white space from the beginning of the cookie name
            while (theDecodedCookieName.charAt(0) == ' ') {
                theDecodedCookieName = theDecodedCookieName.substring(
                    1, theDecodedCookieName.length);
            }
            if (theDecodedCookieName === passedCookieName) {
                theStroedCookieValue = theStoredCookie.substring((
                        theStoredCookie.indexOf("=") + 1),
                    theStoredCookie.length);
                if (encode_decodeFlag) {
                    theStroedCookieValue = decodeURIComponent(
                        theStroedCookieValue);
                }
                return theStroedCookieValue;
            }
        }
        return null;
    };
    // returns the cookie value string as an array
    self.getCookieValueAsArray = function(cookieName, Opt_decodeFlag) {
        if (!cookieName) {
            console.log(3,
                'No cookie name provided to deleteCookie, exiting with error'
            );
            return false;
        }
        var cookieValueStr = null,
            cookieArray = null,
            value, returnVal = [],
            encode_decodeFlag;
        encode_decodeFlag = self.getEncode_Decode(Opt_decodeFlag);
        // need to pull it everytime to make sure we get the latest value in the cookie
        cookieValueStr = self.getCookieValueAsString(cookieName,
            encode_decodeFlag);
        if (!cookieValueStr) {
            console.log(2,
                'could not find value for cookie, getCookieValueAsArray ' +
                cookieName);
            return null;
        }
        // if the cookie is found, create an array from the values
        if (cookieValueStr) {
            cookieArray = cookieValueStr.split(self.getCookieDelimiter());
            for (var i = 0; i < cookieArray.length; i++) {
                value = cookieArray[i];
                while (value.charAt(0) == ' ') {
                    value = value.substring(1, value.length);
                }
                if (value != '') {
                    returnVal.push(value);
                }
            }
            return returnVal;
        } else {
            return false;
        }
    };
    //removes a specified value from the cookie, if the last value in the cookie, removes the cookie all together
    self.removeValueByValue = function(cookieName, value,
        Opt_decodeFlag) {
        var newValueString = "",
            valueInCookie = null,
            encode_decodeFlag;
        if (!cookieName || !value) {
            console.log(
                'Missing parameters for removeValueByValue method.'
            );
            return false;
        }
        encode_decodeFlag = self.getEncode_Decode(Opt_decodeFlag);
        valueInCookie = self.findValueInCookie(cookieName, value,
            encode_decodeFlag);
        //if didn't find the value in the cookie but the cookie does exist
        if (valueInCookie === false) {
            cookieValueArray = null;
            return false;
        } else if (valueInCookie === null) // if the cookie does not exist
        {
            cookieValueArray = null;
            return null;
        } else { // if found cookie with values
            // if there is already an array of values for the cookie
            if (cookieValueArray) {
                // there is only one value to be removed, then remove cookie completely
                if (cookieValueArray.length === 1) {
                    self.deleteCookie(cookieName, encode_decodeFlag);
                } else {
                    for (var i = 0; i < cookieValueArray.length; i++) {
                        if (cookieValueArray[i] === value) {
                            cookieValueArray.splice(i, 1);
                            cookieValueArray = cookieValueArray.join(
                                cookieDelimiter);
                            self.createCookie(cookieName,
                                cookieValueArray,
                                cookieLifeSpan, null, null,
                                null, encode_decodeFlag);
                            cookieValueArray = null;
                            return true;
                        }
                    }
                } //end of else
            }
        }
    };
    // delete the cookie from the browser
    self.deleteCookie = function(cookieName, Opt_decodeFlag) {
        if (!cookieName) {
            console.log(
                'No cookie name provided to deleteCookie, exiting with error'
            );
            return false;
        }
        var encode_decodeFlag;
        encode_decodeFlag = self.getEncode_Decode(Opt_decodeFlag);
        if (encode_decodeFlag) {
            cookieName = decodeURIComponent(cookieName);
        }
        self.createCookie(cookieName, "", -1, null, domainValue);
    };
    // this removes all cookies from the browser
    self.deleteAllCookies = function(Opt_decodeFlag) {
        var cookieList = self.getDomainCookieList(),
            cookie = null,
            equalSignLocation = null,
            cookieName = null,
            encode_decodeFlag;
        //find all cookie files and then send them to the deleteCookie function
        for (var i = 0; i < cookieList.length; i++) {
            cookie = cookieList[i];
            while (cookie.charAt(0) == ' ') {
                cookie = cookie.substring(1, cookie.length);
            }
            equalSignLocation = cookie.indexOf("=");
            cookieName = cookie.slice(0, equalSignLocation);
            encode_decodeFlag = self.getEncode_Decode(
                Opt_decodeFlag);
            if (encode_decodeFlag) {
                cookieName = decodeURIComponent(cookieName);
            }
            self.deleteCookie(cookieName, encode_decodeFlag);
        }
        return true;
    };
    return {
        initialize: self.initialize,
        getCookieDelimiter: self.getCookieDelimiter,
        setCookieDelimiter: self.setCookieDelimiter,
        setCookieLifeSpan: self.setCookieLifeSpan,
        setPathValue: self.setPathValue,
        activateEncoding: self.activateEncoding,
        resetCookieLifeSpan: self.resetCookieLifeSpan,
        populateCookie: self.populateCookie,
        addValueToCookie: self.addValueToCookie,
        findValueInCookie: self.findValueInCookie,
        createCookie: self.createCookie,
        getCookieValueAsString: self.getCookieValueAsString,
        getCookieValueAsArray: self.getCookieValueAsArray,
        removeValueByValue: self.removeValueByValue,
        deleteCookie: self.deleteCookie,
        deleteAllCookies: self.deleteAllCookies,
        getDomainCookieList: self.getDomainCookieList,
        handlerObj: self
    };
})();