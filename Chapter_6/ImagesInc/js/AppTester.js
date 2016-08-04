// very basic testing of our application as we develop
var AppTester = (function() {
    // generate footer, header and content area of index.html based on object definitions for these sections
    try {
        ImagesInc_PageUpdater.updateElement("headerContainer",
            ImagesInc_GlobalData.getHeaderHTMLTxt());
        ImagesInc_PageUpdater.updateElement("footerContainer",
            ImagesInc_GlobalData.getFooterHTMLTxt());
        ImagesInc_PageUpdater.updateElement("mainPageContainer",
            ImagesInc_GlobalData.getContentAreaHTMLTxt());
    } catch (e) {
        ImagesInc_LoggingHandler.logError(
            'PageUpdater module not found');
    }
    //testing message logging mechanism
    try {
        ImagesInc_LoggingHandler.logError(
            "this is a test for logging errors!");
        ImagesInc_LoggingHandler.logInfo();
    } catch (e) {
        ImagesInc_LoggingHandler.logError(
            'LogginHandler module not found');
    }
    //testing access control to our module private properties
    try {
        console.log(ImagesInc_GlobalData.headerContainerDef.sectionHTML);
        console.log(ImagesInc_GlobalData.footerContainerDef.sectionHTML);
    } catch (e) {
        ImagesInc_LoggingHandler.logError(
            'could not access the property');
    }
    //testing GlobalData augmentation
    ImagesInc_GlobalData.getExtendedModuleMsg();
    // testing access to the original module property which was overridden using tight augmentation
    //make sure you uncomment related code in Modules_3.js before you run this test
    //ImagesInc_GlobalData.getExtendedModuleOriginalMsg();
    // testing to show that private variables are not accessible by instances of an object
    function testConstructor() {
        this.someValue = "Value in the constructor function";
        var privateValue = "no instances will have a copy of me";
    }
    testConstructor.prototype.testFunc = function() {
        console.log(this.someValue);
    };
    var firstInstance = new testConstructor();
    var secondInstance = new testConstructor();
    // displays "Value in the constructor function"
    console.log(firstInstance.someValue);
    // testing to see how instances do not share the properties set on each instance
    firstInstance.someValue = "Value for the firstInstance";
    secondInstance.someValue = "Value for the secondInstance";
    // displays "Value for the firstInstance"
    console.log(firstInstance.someValue);
    // displays "Value for the firstInstance"
    firstInstance.testFunc();
    // displays "value for the secondInstance"
    secondInstance.testFunc();
    // testing to show how prototype properties are shared among instances
    testConstructor.prototype.sharedValue =
        "this value is shared among all instances";
    // displays "this value is shared among all instances"
    console.log(firstInstance.sharedValue);
    // displays "this value is shared among all instances"
    console.log(secondInstance.sharedValue);
    // testing to show how a new property added to the contructor function is not seen by the instances
    // after instantiation has taken place
    testConstructor.newProperty =
        "this is a new property but not shared";
    // displays undefined
    console.log(firstInstance.newProperty);
    // displays undefined
    console.log(firstInstance.privateValue);
    // adding a new value to the original object, 
    // after assigning the object reference to another object
    var testObj1 = {
        testValue: 5
    };
    var testObj2 = testObj1;
    testObj1.newValue = "this is a new value";
    // displays "this is a new value"
    console.log(testObj2.newValue);
    //*** testing module cloning ***   
    // creating a clone object
    CloneModule = TestModule.clone(true);
    //  or we can use the following call
    // var CloneModule = Object.prototype.clone.call(TestModule,true);
    // displays "This property will be cloned"
    console.log(CloneModule.testFunc());
    // displays undefined
    console.log(CloneModule.privateTestValue +
        "  --> CloneModule.privateTestValue");
    // displays "Test for cloning, this property is hidden but now showing it publicly"
    console.log(CloneModule.publicTestValue +
        "  --> CloneModule.publicTestValue");
    // displays "the private value has been changed"
    console.log(TestModule.changePrivateVar() +
        "  --> TestModule.changePrivateVar()");
    // displays "the private value has been changed"
    console.log(TestModule.getPrivteValue() +
        "  --> TestModule.getPrivteValue()");
    // displays "the private value has been changed"
    console.log(CloneModule.getPrivteValue() +
        "  --> CloneModule.getPrivteValue()");
    CloneModule.publicTestValue = "Changing the public variable value";
    // displays "Changing the public variable value!"
    console.log(CloneModule.publicTestValue +
        "  --> CloneModule.publicTestValue");
    // displays "Test for cloning, this property is hidden but now showing it publicly"
    console.log(TestModule.publicTestValue +
        "  --> TestModule.publicTestValue");
})();
var AnotherTestFunc = function() {
    var testingValue = "Should be copied";
    this.testValue2 = "Should also be copied";
};
var testFunc2 = new AnotherTestFunc();
var testFunc3 = AnotherTestFunc.clone(true);
// displays undefined
console.log(testFunc2.testingValue);
// displays undefined
console.log(testFunc3.testingValue);