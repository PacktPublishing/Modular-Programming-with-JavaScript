var ImagesInc_Base = (function() {
    function getBaseModule() {
        if (typeof jQuery !== 'undefined') {
            return jQuery;
        } else {
            return null;
        }
    }
    return {
        getBaseModule: getBaseModule
    };
})();