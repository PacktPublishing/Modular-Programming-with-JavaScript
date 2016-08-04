// adding AppTester as a sub-module
ImagesInc_Core.AppTester = (function() {
    
    function runAllUnitTests() {
        var testModule;
        for (testModule in ImagesInc_Core.AppTester) {
            if (typeof ImagesInc_Core.AppTester[testModule] ===
                'object') {
                // run tests
                ImagesInc_Core.AppTester[testModule].runAllTests();
            }
        }
    }

    function reportTestResults(totalNumOfTest, passedNum, failedNum) {
        var failTestMsgColor;
        failTestMsgColor = failedNum ? 'red' : 'pink';
        ImagesInc_Core.log(1, 'Total number of tests run: ' +
            totalNumOfTest, 'orange');
        ImagesInc_Core.log(1, 'Number of Tests Passed: ' +
            passedNum, 'green');
        ImagesInc_Core.log(1, 'Number of Tests failed: ' +
            failedNum, failTestMsgColor);
    }
    return {
        runAllUnitTests: runAllUnitTests,
        reportTestResults: reportTestResults
    };
})();