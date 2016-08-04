// none AMD module
var person3 = (function() {
    console.log(person4.first +
        "  --> Accessing person4 ; from person3");
    // we have access to person4 as a global object, which its dependency was defined in the config file
    return {
        first: "Sasan",
        last: "Seydnejad"
    };
})();