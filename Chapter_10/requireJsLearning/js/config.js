require.config({
    deps: ['main'],
    paths: {
        //'jquery' : 'libs/jquery'	// if loading from local directory
        'person2': 'modules/person2', // location to none AMD modules
        'person3': 'modules/person3',
        'person4': 'modules/person4',
        'jquery': "https://code.jquery.com/jquery-1.12.3.min" // loading from CDN
    },
    shim: {
        "person2": {
            "exports": "person2"
                // use this alias in the global scope and pass it to modules as dependency
        },
        "person3": {
            deps: ['person4'],
            // none AMD module, depending on another non AMD module		
            "exports": "person3"
        }
    }
});