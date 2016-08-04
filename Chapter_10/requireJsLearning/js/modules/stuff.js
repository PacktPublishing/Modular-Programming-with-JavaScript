// AMD module
define(['person3'], function(person3) {
    // person3 is none AMD, so we use requirejs to load it and then pass the parameter in
    // as a local parameter, even though, we also have access to it as a global object 
    console.log(person3.first +
        "  --> Accessing person3.first from stuff");
    return {
        likes: ['Car', 'Bike', 'Scooter']
    };
});
