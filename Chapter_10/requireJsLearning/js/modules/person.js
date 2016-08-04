// AMD module with dependencies
define(['modules/stuff', 'jquery'], function(stuff, jq) {
    // defining dependencies for this module, the first dependency is an AMD module so we give path
    console.log(jq + "  --> Accessing jQuery from person");
    return {
        first: "Sam",
        last: "SamLastName",
        favorites: stuff.likes.join(' ')
    };
});