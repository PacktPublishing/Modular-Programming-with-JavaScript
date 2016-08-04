// using this to run Mocha unit tests but shouldn't be for production
// and not really part of the project for chapter 10, it is here just to see the tests
describe("Testing cookieHandler Sub-module", function() {
    var cookieHandler = globalCookieHandler;
    describe("createCookie Method", function() {
        it("should exist", function() {
            expect(cookieHandler.createCookie).toBeDefined();
        });
        it("should return false, when no cookie Name is passed",
            function() {
                var retrnedValue = cookieHandler.createCookie(
                    null, "testing for cookie", false);
                expect(retrnedValue).toBe(false);
            });
        it(
            "should return false, when no cookie Value is passed",
            function() {
                var retrnedValue = cookieHandler.createCookie(
                    null, "testing for cookie", false);
                expect(retrnedValue).toBe(false);
            });
        it(
            "should return undefined when cookie name and value have been passed",
            function() {
                var returnedValue = cookieHandler.createCookie(
                    "testCreateCookie",
                    "testing for cookie", false);
                expect(returnedValue).toBe(undefined);
            });
        it("should create a cookie", function() {
            cookieHandler.createCookie(
                "testCreateCookie",
                "testing for cookie, createCookie Method",
                false);
            var value = cookieHandler.getCookieValueAsString(
                "testCreateCookie");
            expect(value).toBe(
                "testing for cookie, createCookie Method"
            );
        });
    });
    describe("getCookieValueAsString Method", function() {
        it("should exist", function() {
            expect(cookieHandler.getCookieValueAsString)
                .toBeDefined();
        });
        it("should return false, when no cookie Name is passed",
            function() {
                var retrnedValue = cookieHandler.getCookieValueAsString(
                    null);
                expect(retrnedValue).toBe(false);
            });
        it("should return null when the cookie is not found",
            function() {
                var returnedValue = cookieHandler.getCookieValueAsString(
                    "testCreateCookieNotFound");
                expect(returnedValue).toBeNull();
            });
        it("should return the value of the cookie correctly",
            function() {
                cookieHandler.createCookie(
                    "testCreateCookie2",
                    "testing for cookie2, getCookieValueAsString Method",
                    false);
                var returnedValue = cookieHandler.getCookieValueAsString(
                    "testCreateCookie2");
                expect(returnedValue).toBe(
                    "testing for cookie2, getCookieValueAsString Method"
                );
            });
    });
    describe("populateCookie Method", function() {
        it("should exist", function() {
            expect(cookieHandler.populateCookie).toBeDefined();
        });
        it("should return false, when no cookie Name is passed",
            function() {
                var retrnedValue = cookieHandler.populateCookie(
                    null, "testing for cookie", false);
                expect(retrnedValue).toBe(false);
            });
        it(
            "should return false, when no cookie Value is passed",
            function() {
                var retrnedValue = cookieHandler.populateCookie(
                    null, "testing for cookie", false);
                expect(retrnedValue).toBe(false);
            });
        it(
            "should return true when cookie name and value have been passed",
            function() {
                var returnedValue = cookieHandler.populateCookie(
                    "testCreateCookie3",
                    "testing for cookie3, populateCookie Method ",
                    false);
                expect(returnedValue).toBe(true);
            });
        it("should call getCookieValueAsString", function() {
            var cookieHandlerObj = cookieHandler.handlerObj; // to set the context properly for the spy
            spyOn(cookieHandlerObj,
                'getCookieValueAsString').and.callThrough();
            cookieHandler.populateCookie(
                "testCreateCookie3",
                "Adding a new value to existing cookie, populateCookie Method"
            );
            expect(cookieHandlerObj.getCookieValueAsString)
                .toHaveBeenCalled();
        });
        it("should create a new cookie", function() {
            cookieHandler.populateCookie(
                "testCreateCookie4",
                "testing for cookie4, populateCookie Method",
                false);
            var value = cookieHandler.getCookieValueAsString(
                "testCreateCookie4");
            expect(value).toBe(
                "testing for cookie4, populateCookie Method"
            );
        });
        it("should add a new value to the existing cookie",
            function() {
                cookieHandler.populateCookie(
                    "testCreateCookie4",
                    "testing for cookie4Plus, populateCookie Method",
                    false);
                var value = cookieHandler.getCookieValueAsString(
                    "testCreateCookie4");
                expect(value).toBe(
                    "testing for cookie4, populateCookie Method~testing for cookie4Plus, populateCookie Method"
                );
            });
        it(
            "should NOT add a duplicate value to the existing cookie",
            function() {
                var value = cookieHandler.populateCookie(
                    "testCreateCookie4",
                    "testing for cookie4Plus, populateCookie Method",
                    false);
                expect(value).not.toBeTruthy();
            });
    });
    describe("deleteAllCookies Method", function() {
        it("should exist", function() {
            expect(cookieHandler.deleteAllCookies).toBeDefined();
        });
        it("should return true after removing all cookies",
            function() {
                var value = cookieHandler.deleteAllCookies();
                expect(value).toBe(true);
            });
        it("should not have any cookies for the domain",
            function() {
                var valueArray = cookieHandler.getDomainCookieList();
                expect(valueArray).toBeFalsy();
            });
    });
});