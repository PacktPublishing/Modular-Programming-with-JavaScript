ImagesInc_Core.AppTester = (function(mainTestModule) {
    if (!mainTestModule) {
        ImagesInc_Core.log(3, 'main test module not found!');
        return false;
    }
    var CookieTester = mainTestModule.CookieHandlerTester = {};
    var unitTests = [],
        totalErrors = 0,
        totalPasses = 0;
    //create a new value in the cookie
    unitTests[unitTests.length] = CookieTester.createCookie = function(
        name, value, decodeFlag) {
        if (!name) {
            name = "testCreateCookie";
        }
        if (!value) {
            value = "testing for cookie";
        }
        if (!decodeFlag) {
            decodeFlag = false;
        }
        ImagesInc_Core.CookieHandler.createCookie(name, value);
        var cookieVal = ImagesInc_Core.CookieHandler.getCookieValueAsString(
            name);
        if (cookieVal === value) {
            ImagesInc_Core.log(1, 'createCookie has passed',
                'green');
            totalPasses++;
        } else {
            ImagesInc_Core.log(3, 'createCookie has Failed!');
            totalErrors++;
        }
    };
    //append a new value to the cookie
    unitTests[unitTests.length] = CookieTester.populateCookie =
        function(name, value) {
            if (!name) {
                name = "testCreateCookie";
            }
            if (!value) {
                value = "Appending value to the same cookie";
            }
            //gets value without the delimiter
            var cookieCurrentVal = ImagesInc_Core.CookieHandler.getCookieValueAsString(
                name);
            //adds the value with delimiter
            ImagesInc_Core.CookieHandler.populateCookie(name, value);
            var cookieVal = ImagesInc_Core.CookieHandler.getCookieValueAsString(
                name);
            var cookieDelimiter = ImagesInc_Core.CookieHandler.getCookieDelimiter();
            value = cookieCurrentVal + cookieDelimiter + value;
            if (cookieVal === value) {
                ImagesInc_Core.log(1, 'populateCookie has passed',
                    'green');
                totalPasses++;
            } else {
                ImagesInc_Core.log(3, 'populateCookie has Failed!');
                totalErrors++;
            }
        };
    // test to see if the value can be found in cookie correctly
    unitTests[unitTests.length] = CookieTester.findValueInCookie =
        function(name, value, shouldFail) {
            if (!name) {
                name = "testCreateCookie";
            }
            if (!value) {
                value = "testing for cookie";
            }
            //gets value without the delimiter
            var valueIsFound = ImagesInc_Core.CookieHandler.findValueInCookie(
                name, value);
            if (valueIsFound) {
                ImagesInc_Core.log(1, 'findValueInCookie has passed',
                    'green');
                totalPasses++;
            } else {
                // negative tests are designed to pass
                if (shouldFail) {
                    ImagesInc_Core.log(1,
                        'findValueInCookie has passed', 'green');
                    totalPasses++;
                    return;
                }
                ImagesInc_Core.log(3, 'findValueInCookie has Failed!');
                totalErrors++;
            }
        };
    // add new value to the cookie
    unitTests[unitTests.length] = CookieTester.addValueToCookie =
        function(name, value, shouldModify) {
            if (!name) {
                name = "testCreateCookie";
            }
            if (!value) {
                value =
                    "Appending yet anohter value to the same cookie";
            }
            //gets value without the delimiter
            var cookieCurrentVal = ImagesInc_Core.CookieHandler.getCookieValueAsString(
                name);
            //adds the value with delimiter
            ImagesInc_Core.CookieHandler.addValueToCookie(name, value);
            var cookieModifiedVal = ImagesInc_Core.CookieHandler.getCookieValueAsString(
                name);
            var cookieDelimiter = ImagesInc_Core.CookieHandler.getCookieDelimiter();
            // if the value should not be modified because it is a duplicate
            if (shouldModify === false) {
                value = cookieCurrentVal;
            } else {
                value = cookieCurrentVal + cookieDelimiter + value;
            }
            if (cookieModifiedVal === value) {
                ImagesInc_Core.log(1, 'addValueToCookie has passed',
                    'green');
                totalPasses++;
            } else {
                ImagesInc_Core.log(3, 'addValueToCookie has Failed!');
                totalErrors++;
            }
        };
    //append a new value to the cookie
    unitTests[unitTests.length] = CookieTester.getCookieValueAsString =
        function(name, value) {
            if (!name) {
                name = "testForGetValueAsString";
            }
            if (!value) {
                value = "Test to see if this value is read properly";
            }
            // create the cookie
            ImagesInc_Core.CookieHandler.createCookie(name, value);
            // get cookie's value
            var cookieVal = ImagesInc_Core.CookieHandler.getCookieValueAsString(
                name);
            if (cookieVal === value) {
                ImagesInc_Core.log(1,
                    'getCookieValueAsString has passed', 'green');
                totalPasses++;
            } else {
                ImagesInc_Core.log(3,
                    'getCookieValueAsString has Failed!');
                totalErrors++;
            }
        };
    //append the stings in the cookie as an array
    unitTests[unitTests.length] = CookieTester.getCookieValueAsArray =
        function(name, value1, value2) {
            if (!name) {
                name = "testForGetValueAsArray";
            }
            if (!value1) {
                value1 = "value1";
            }
            if (!value2) {
                value2 = "value2";
            }
            // create the cookie
            ImagesInc_Core.CookieHandler.createCookie(name, value1);
            // add the second value to cookie
            ImagesInc_Core.CookieHandler.addValueToCookie(name, value2);
            // get cookie's value
            var cookieVal = ImagesInc_Core.CookieHandler.getCookieValueAsArray(
                name);
            if (ImagesInc_Core.checkIfArray(cookieVal)) {
                if (cookieVal[0] === "value1" && cookieVal[1] ===
                    "value2") {
                    ImagesInc_Core.log(1,
                        'getCookieValueAsArray has passed', 'green'
                    );
                    totalPasses++;
                } else {
                    ImagesInc_Core.log(3,
                        'getCookieValueAsArray has Failed!');
                    totalErrors++;
                }
            } else {
                ImagesInc_Core.log(3,
                    'getCookieValueAsArray has Failed!');
                totalErrors++;
            }
        };
    // remove a value from the cookie based on the value
    unitTests[unitTests.length] = CookieTester.removeValueByValue =
        function(name, value1, value2) {
            if (!name) {
                name = "testForRemoveValue";
            }
            if (!value1) {
                value1 = "value1";
            }
            if (!value2) {
                value2 = "value2";
            }
            // create the cookie
            ImagesInc_Core.CookieHandler.createCookie(name, value1);
            // add the second value to cookie
            ImagesInc_Core.CookieHandler.addValueToCookie(name, value2);
            // remove first value from the cookie
            ImagesInc_Core.CookieHandler.removeValueByValue(name,
                value1);
            // get cookie's value
            var cookieVal = ImagesInc_Core.CookieHandler.getCookieValueAsString(
                name);
            if (cookieVal === value2) {
                ImagesInc_Core.log(1, 'removeValueByValue has passed',
                    'green');
                totalPasses++;
            } else {
                ImagesInc_Core.log(3, 'removeValueByValue has Failed!');
                totalErrors++;
            }
        };
    // remove a value from the cookie based on the delimiter
    unitTests[unitTests.length] = CookieTester.deleteCookie = function(
        name, value) {
        if (!name) {
            name = "testForDeleting";
        }
        if (!value) {
            value = "This cookie should be deleted";
        }
        // create the cookie
        ImagesInc_Core.CookieHandler.createCookie(name, value);
        // delete the cookie
        ImagesInc_Core.CookieHandler.deleteCookie(name);
        // get cookie's value
        var cookieVal = ImagesInc_Core.CookieHandler.getCookieValueAsString(
            name);
        if (!cookieVal) {
            ImagesInc_Core.log(1, 'deleteCookie has passed',
                'green');
            totalPasses++;
        } else {
            ImagesInc_Core.log(3, 'deleteCookie has Failed!');
            totalErrors++;
        }
    };
    CookieTester.cleanup = function() {
        ImagesInc_Core.CookieHandler.deleteAllCookies();
        totalErrors = 0;
        totalPasses = 0;
    };
    // run all unit tests
    CookieTester.runAllTests = function() {
        ImagesInc_Core.log(1,
            '*** RUNNING CookieHandler MODULE UNIT TESTS ***',
            'orange');
        // run all unit tests
        for (var i = 0; i < unitTests.length; i++) {
            unitTests[i]();
        }
        //** test for negative result
        // should not be able to find the value below in the cookie specified
        CookieTester.findValueInCookie("testCreateCookie",
            "some value!", true);
        unitTests.length++;
        // should not be able to add the value to the cookie as it will be a duplicate
        CookieTester.addValueToCookie("testCreateCookie",
            "testing for cookie", false);
        unitTests.length++;
        mainTestModule.reportTestResults(unitTests.length,
            totalPasses, totalErrors);
        CookieTester.cleanup();
    };
    return mainTestModule;
})(ImagesInc_Core.AppTester); // using tight augmentation