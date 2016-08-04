// using this to run Mocha unit tests but shouldn't be for production
// and not really part of the project for chapter 10, it is here just to see the tests
var expect = chai.expect;
describe("Testing storageHandler Sub-module", function() {
    var storageHandler = globalStorageHandler;
    describe("saveValueToLocalStorage Method", function() {
        it("should exit", function() {
            expect(storageHandler.saveValueToLocalStorage)
                .to.exit;
        });
        it("should return false when no key is passed in",
            function() {
                var value = storageHandler.saveValueToLocalStorage(
                    "test");
                expect(value).to.be.false;
            });
        it("should return false when no value is passed in",
            function() {
                var value = storageHandler.saveValueToLocalStorage(
                    "test", "");
                expect(value).to.be.false;
            });
        it(
            "should create value for the key in the local storage",
            function() {
                storageHandler.saveValueToLocalStorage(
                    "testkey", "test value");
                var value = storageHandler.getValueForKeyAsString(
                    "testkey");
                expect(value).to.equal("test value");
            });
        it(
            "should return true when the value is created in the local storage",
            function() {
                var value = storageHandler.saveValueToLocalStorage(
                    "testkey2", "test value2");
                expect(value).to.be.true;
            });
    });
    describe("getValueForKeyAsString Method", function() {
        it("should exit", function() {
            expect(storageHandler.getValueForKeyAsString)
                .to.exit;
        });
        it("should throw error when no key is passed in",
            function() {
                expect(function() {
                    storageHandler.getValueForKeyAsString();
                }).to.throw(Error, /no key passed in!/);
                // below will not work properly, as it won't catch the error, we need to implement as shown above
                //expect(storageHandler.getValueForKeyAsString()).to.throw(Error);
            });
        it(
            "should return false when the key does not exist in local storage",
            function() {
                var value = storageHandler.getValueForKeyAsString(
                    "nonExistingKey");
                expect(value).to.be.false;
            });
        it("should return the correct value from local storage",
            function() {
                storageHandler.saveValueToLocalStorage(
                    "testkey2", "test value2");
                var value = storageHandler.getValueForKeyAsString(
                    "testkey2");
                expect(value).to.equal("test value2");
            });
    });
    describe("checkLocalStorageForkey Method", function() {
        it("should exit", function() {
            expect(storageHandler.checkLocalStorageForkey)
                .to.exit;
        });
        it(
            "should return false when the key does not exist in the local storage",
            function() {
                var value = storageHandler.checkLocalStorageForkey(
                    "testkey33");
                expect(value).to.be.false;
            });
        it(
            "should return true when the key exists in local storage",
            function() {
                storageHandler.saveValueToLocalStorage(
                    "testkey3", "test value3");
                var value = storageHandler.checkLocalStorageForkey(
                    "testkey3");
                expect(value).to.be.true;
            });
    });
    describe("replaceValueForKey Method", function() {
        it("should exit", function() {
            expect(storageHandler.replaceValueForKey).to
                .exit;
        });
        it("should return false when the key is not passed in",
            function() {
                var value = storageHandler.replaceValueForKey(
                    "");
                expect(value).to.be.false;
            });
        it(
            "should return false when the value is not passed in",
            function() {
                var value = storageHandler.replaceValueForKey(
                    "testkey3", "");
                expect(value).to.be.false;
            });
        it("should replace value with the new value", function() {
            storageHandler.saveValueToLocalStorage(
                "testkey4", "test value4");
            storageHandler.replaceValueForKey(
                "testkey4", "test value4Replaced");
            var value = storageHandler.getValueForKeyAsString(
                "testkey4");
            expect(value).to.equal(
                "test value4Replaced");
        });
    });
    describe("removeKeyFromStorage Method", function() {
        it("should exit", function() {
            expect(storageHandler.removeKeyFromStorage)
                .to.exit;
        });
        it("should remove key from local storage", function() {
            storageHandler.saveValueToLocalStorage(
                "testkey5", "test value5");
            storageHandler.removeKeyFromStorage(
                "testkey5");
            var value = storageHandler.getValueForKeyAsString(
                "testkey5");
            expect(value).to.be.false;
        });
    });
    describe("clearLocalStorage", function() {
        it("should exit", function() {
            expect(storageHandler.clearLocalStorage).to
                .exit;
        });
        it("should remove ALL keys from local storage",
            function() {
                storageHandler.clearLocalStorage();
                var value = storageHandler.getValueForKeyAsString(
                    "testkey4");
                expect(value).to.be.false;
            });
    });
});