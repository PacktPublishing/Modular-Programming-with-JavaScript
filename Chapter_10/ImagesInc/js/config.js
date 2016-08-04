require.config({
    deps: ['main'],
    paths: {
        'MainCore': 'Modules/Core/MainCore',
        'Logger': 'Modules/Core/Logger',
        'AjaxEngine': 'Modules/Core/AjaxEngine',
        'CookieHandler': 'Modules/Core/CookieHandler',
        'NotificationHandler': 'Modules/Core/NotificationHandler',
        'StorageHandler': 'Modules/Core/StorageHandler',
        'Utilities': 'Modules/Core/Utilities',
        'SandBox': 'Modules/SandBox/SandBox',
        'ImagesInc_Content': 'Components/ImagesInc_Content',
        'ImagesInc_Footer': 'Components/ImagesInc_Footer',
        'ImagesInc_Header': 'Components/ImagesInc_Header',
        'AppTester': 'Modules/AppTester/AppTester',
        'CookieHandlerTester': 'Modules/AppTester/CookieHandlerTester',
        'StorageHandlerTester': 'Modules/AppTester/StorageHandlerTester',
        'Base': 'Modules/Base/Base',
        'jquery': 'Modules/Base/jquery-1.10.2.min',
        'GlobalData_Sub': 'Modules/GlobalData/GlobalData_Sub',
        'GlobalData': 'Modules/GlobalData/GlobalData'
    },
    shim: {
        'Base': {
            exports: 'Base'
        },
        'jquery': {
            exports: 'jquery'
        },
        'GlobalData_Sub': {
            exports: 'GlobalData_Sub'
        },
        'GlobalData': {
            exports: 'GlobalData'
        },
        'MainCore': {
            deps: ['SandBox', 'jquery', 'GlobalData_Sub', 'GlobalData'],
            exports: 'ImagesInc_Core'
                // use this alias in the global scope and pass it to modules as dependency
        },
        'SandBox': {
            exports: 'SandBox'
        },
        'ImagesInc_Content': {
            deps: ['MainCore'],
            exports: "ImagesInc_Content"
        },
        'ImagesInc_Footer': {
            deps: ['MainCore'],
            exports: "ImagesInc_Footer"
        },
        'ImagesInc_Header': {
            deps: ['MainCore'],
            exports: "ImagesInc_Header"
        },
        'AppTester': {
            deps: ['MainCore']
        },
        'CookieHandlerTester': {
            deps: ['AppTester', 'CookieHandler']
        },
        'StorageHandlerTester': {
            deps: ['AppTester', 'StorageHandler']
        }
    }
});