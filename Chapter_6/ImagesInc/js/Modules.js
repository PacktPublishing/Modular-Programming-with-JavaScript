var ImagesInc_Utilitizes = (function() {
    var clone = function clone(deep) {
        // create an instance of the object
        var newClonedObj = new this.constructor();
        //copy all properties from the original object
        for (var property in this) {
            // if deep flag is not set, just do a shallow copy of properties
            if (!deep) {
                if (this.hasOwnProperty(property)) {
                    newClonedObj[property] = this[property];
                }
                // to make a deep copy, call the function recursively
            } else if (typeof this[property] == 'object' && this.hasOwnProperty(
                property)) {
                newClonedObj[property] = this[property].clone(deep);
            } else if (this.hasOwnProperty(property)) {
                //Just copy properties for non objects
                newClonedObj[property] = this[property];
            }
        }
        return newClonedObj;
    };
    // attach the clone function to Object prototype
    var initialize = (function() {
        Object.prototype.clone = clone;
    })();
})();
var ImagesInc_GlobalData = (function(module) {
    var headerContainerDef = {
        sectionHTML: '<div class="logo_titleClass" >' +
            '<a href=""><img src="img/ImagesIncLogo.png" alt="Company Logo" style="max-height:100%;"></a>' +
            '<div class="siteTitleClass">Images Inc.</div>' +
            '</div>' +
            '<nav role="navigation" itemscope itemtype="https://schema.org/SiteNavigationElement">' +
            '<h1 class="hiddenClass">Main Navigation</h1>' +
            '<ul class="navmenuClass" >' +
            '<li><a href="#" class="active">Home</a></li>' +
            '<li><a href="#">Our Company</a></li>' +
            '<li><a href="#">Pricing</a></li>' +
            '<li><a href="#">Contact Us</a></li>' + '</ul>' +
            '</nav>'
    };
    var footerContainerDef = {
        sectionHTML: '<div>' + '<a href="#">Latest News</a>' +
            '</div>' + '<div>' + '<a href="#">Services</a>' +
            '</div>' + '<div>' + '<a href="#">Support</a>' +
            '</div>'
    };
    module.getHeaderHTMLTxt = function() {
        return headerContainerDef.sectionHTML;
    };
    module.getFooterHTMLTxt = function() {
        return footerContainerDef.sectionHTML;
    };
    return module;
})(ImagesInc_GlobalData || {}); //using loose augmentation
var ImagesInc_PageUpdater = (function() {
    // module private function
    var insertHTMLTxt = function(containerID, newStructure) {
        var theContainer = document.getElementById(containerID);
        theContainer.innerHTML = newStructure;
    };
    // module private function
    var applyElementCSS = function(elementID, className) {
        var theElement = document.getElementById(elementID);
        theElement.className = className;
    };
    return {
        // privileged method
        updateElement: function(elemID, htmlTxt) {
            insertHTMLTxt(elemID, htmlTxt);
        },
        // privileged method
        updateElementClass: function(elemId, className) {
            if (!className) {
                console.error(
                    'No class name has been provided, exiting module!'
                );
            }
            applyElementCSS(elemId, className);
        }
    };
})();
var TestModule = (function() {
    var privateTestValue = "Test for cloning, this property is hidden";
    return {
        publicTestValue: privateTestValue +
            " but now showing it publicly",
        testFunc: function() {
            var anotherTest = "This property will be cloned";
            return anotherTest;
        },
        getPrivteValue: function() {
            return privateTestValue;
        },
        changePrivateVar: function() {
            privateTestValue = "the private value has been changed";
            return privateTestValue;
        },
        testArray: [1, 2, 3]
    };
})();
var Polygon_Module = (function() {
    var sides = 6;
    var name = "Polygon";
    var type = "2D";

    function getSides() {
        return sides;
    }

    function getName() {
        return name;
    }

    function getType() {
        return type;
    }
    return {
        getSides: getSides,
        getName: getName,
        getType: getType
    };
})();
var Rectangle_Module = (function() {
    var Rectangle = {};
    var sides = 4;
    var name = "Rectangle";
    var color = "blue";
    Rectangle.__proto__ = Polygon_Module;
    Rectangle.getName = function() {
        return name;
    };
    Rectangle.getSides = function() {
        return sides;
    };
    Rectangle.getColor = function() {
        return color;
    };
    return {
        getName: Rectangle.getName,
        getSides: Rectangle.getSides,
        getType: Rectangle.getType
    };
})();
console.log(Polygon_Module.getName()); //displays "Polygon"
console.log(Polygon_Module.getSides()); // displays 6
console.log(Rectangle_Module.getName()); // displays "Rectangle"
console.log(Rectangle_Module.getSides()); // displays 4
console.log(Rectangle_Module.getType()); // displays "2D"
var Polygon_Module2 = (function() {
    var sides = 6;
    var name = "Polygon";
    var type = "2D";

    function Polygon() {
        this.sides = sides;
        this.name = name;
        this.type = type;
    }
    Polygon.prototype.getSides = function() {
        return this.sides;
    };
    Polygon.prototype.getName = function() {
        return this.name;
    };
    Polygon.prototype.getType = function() {
        return this.type;
    };
    return {
        Polygon: Polygon,
    };
})();
var Rectangle_Module2 = (function() {
    var sides = 4;
    var name = "Rectangle";

    function Rectangle() {
        Polygon_Module2.Polygon.apply(this);
        this.sides = sides;
        this.name = name;
    }
    Rectangle.prototype = Polygon_Module2.Polygon.prototype;
    Rectangle.prototype.constructor = Rectangle;
    var RectangleInstance = new Rectangle();
    return {
        Rectangle: RectangleInstance
    };
})();
console.log(Rectangle_Module2.Rectangle.getName()); // displays "Rectangle"
console.log(Rectangle_Module2.Rectangle.getSides()); // displays 4
console.log(Rectangle_Module2.Rectangle.getType()); // displays "2D"
// adding a sub-module to a module using simple dynamic property method
var Shape = (function() {
    var type = "Any 2D and 3D shape";

    function getType() {
        return type;
    }
    return {
        getType: getType
    };
})();
// the sub-module
Shape.Polygon = (function() {
    var sides = 6;
    var name = "Polygon";
    var type = "2D";

    function getSides() {
        return sides;
    }

    function getName() {
        return name;
    }

    function getType() {
        return type;
    }
    return {
        getSides: getSides,
        getName: getName,
        getType: getType
    };
})();
// adding a sub-module to a module using Asynchronous properties 
var Polygon_Module;
var Shape = (function(mainModule, subModule) {
    var Polygon = mainModule.Polygon = mainModule.Polygon || subModule;
    Polygon.description = function() {
        return "sub-module has been added to shape module";
    };
    return mainModule;
})(Shape || {}, Polygon_Module || {});
console.log(Shape.Polygon.description());
var Shape = (function(module) {
    var type = "Any 2D and 3D shape";
    module.getType = function() {
        return type;
    };
    return module;
})(Shape || {});
console.log(Shape.getType()); // displays "any 2D and 3D shape"
console.log(Shape.Polygon.description()); // displays "sub-module has been added to shape module"