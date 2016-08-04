// // using this to run Mocha unit tests but shouldn't be for production
// using this to run Mocha unit tests but shouldn't be for production
// and not really part of the project for chapter 10, it is here just to see the tests
var globalStorageHandler = (function() {
    function getValueForKeyAsString(key, decode) {
        if (!key) {
            throw new Error("no key passed in!");
        }
        var valueForKey = localStorage[key];
        if (valueForKey) {
            if (decode) {
                try {
                    valueForKey = decodeURI(valueForKey);
                } catch (e) {
                    console.log(
                        'could not decode value, from StorageHandler.getValueForKeyAsString'
                    );
                    return false;
                }
            }
            return valueForKey;
        } else {
            // if the key is not in the local storage, then return false
            return false;
        }
    }

    function getValueForKeyAsObject(key, decode) {
        var valueForKey = null;
        valueForKey = localStorage[key];
        if (valueForKey) {
            if (decode) {
                valueForKey = decodeURI(valueForKey);
            }
            return JSON.parse(valueForKey);
        } else {
            // if the key is not in the local storage, then return false
            return false;
        }
    }
    // check to see if the key already exits in the database
    function checkLocalStorageForkey(key) {
        if (!key) {
            return false;
        }
        var value = localStorage[key];
        if (value) {
            return true;
        } else {
            // if the tile objects are not in the local storage, then return false
            return false;
        }
    }

    function saveValueToLocalStorage(key, value, encode) {
        if (!key || !value) {
            return false;
        }
        if (typeof value === 'object') {
            value = JSON.stringify(value);
        }
        if (encode) {
            value = encodeURI(value);
        }
        localStorage.setItem(key, value);
        return true;
    }

    function replaceValueForKey(key, newValue, encode) {
        if (!key || !newValue) {
            return false;
        }
        this.removeKeyFromStorage(key);
        saveValueToLocalStorage(key, newValue, encode);
    }

    function saveArrayToLocalStorage(key, value, encode) {
        // if the object is NOT already existing in the database, then save it
        if (checkLocalStorageForkey(key) === false) {
            if (Array.isArray(value)) { //** about using core ifArray function
                if (encode) {
                    value = encodeURI(value);
                }
                localStorage[key] = JSON.stringify(value);
                return true;
            } else {
                console.log(
                    'DataMismatch, from StorageHandler.saveArrayToLocalStorage',
                    'orange');
            }
        } else { // if the value already exits
            return false;
        }
    }
    // if the key already eixts, then in the case of array of objects, add new object to array, in case of object,
    // replace the object.
    // if the key does not exist, then create the key with the value passed in either as an object or as an array of objects
    function appendObjectToLocalStorageArray(key, objToSave, encode) {
        var storedValue = null,
            valueToStore = null;
        if (typeof objToSave !== 'object') {
            console.log(
                'DataMismatch, from appendObjectToLocalStorageArray',
                'orange');
            return false;
        }
        storedValue = getValueForKeyAsObject(key, true);
        //if there was a previously stored value for the key
        if (storedValue) {
            if (Array.isArray(storedValue)) {
                storedValue[storedValue.length] = objToSave;
                valueToStore = storedValue;
            } else { // if the stored value is an object but not an array, just replace it
                valueToStore = objToSave;
            }
        } else { // if there was no value previously in the storage
            valueToStore = objToSave;
        }
        valueToStore = JSON.stringify(valueToStore);
        if (encode) {
            valueToStore = encodeURI(valueToStore);
        }
        localStorage.setItem(key, valueToStore);
    }
    // if the key already exits with a value, then append the string passed to the already existing string value
    // if the key has no value, just add the string as the value of the key in storage
    function appendStringToLocalStorage(key, value, encode) {
        var storedValue = getValueForKeyAsString(key, encode),
            valueToStore;
        if (storedValue) {
            valueToStore = storedValue + value;
        } else {
            valueToStore = value;
        }
        if (encode) {
            valueToStore = encodeURI(valueToStore);
        }
        localStorage.setItem(key, valueToStore);
    }

    function appendValueToKey(key, value, encode) {
        // if an object has been passed in to be saved
        if (typeof value === 'object') {
            appendObjectToLocalStorageArray(key, value, encode);
        } else {
            appendStringToLocalStorage(key, value, encode);
        }
    }

    function removeKeyFromStorage(key) {
        localStorage.removeItem(key);
    }

    function clearLocalStorage() {
        localStorage.clear();
    }
    return {
        getValueForKeyAsString: getValueForKeyAsString,
        getValueForKeyAsObject: getValueForKeyAsObject,
        checkLocalStorageForkey: checkLocalStorageForkey,
        replaceValueForKey: replaceValueForKey,
        saveValueToLocalStorage: saveValueToLocalStorage,
        saveArrayToLocalStorage: saveArrayToLocalStorage,
        appendObjectToLocalStorageArray: appendObjectToLocalStorageArray,
        appendStringToLocalStorage: appendStringToLocalStorage,
        appendValueToKey: appendValueToKey,
        removeKeyFromStorage: removeKeyFromStorage,
        clearLocalStorage: clearLocalStorage
    };
})();