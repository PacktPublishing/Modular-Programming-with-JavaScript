// bootstrap file
require(['modules/person', 'jquery', 'person2'], function(person, $$, person2) {
    console.log(
        "Accessing Person --> person first + person last; from main -> " +
        person.first + ' ' + person.last);
    console.log($$ + "  --> jquery from main");
    console.log("Accessing person2 --> person2.first ; from main -> " +
        person2.first);
});