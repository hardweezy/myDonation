/**
 * helper class for using JS window session storage if available.
 */
class PersistedStorage {

    constructor() {

        this.parseStorage();
    }

    /**
     * return the value associated to itemKey. if not present, return the defaultValue passed in
     * 
     * @param itemKey - itemKey to return associated value of.
     * @param defaultValue - if the itemKey is not present in the session storage, returns this value
     * 
     * @return the value associated with itemKey, false if this browser does not support JS session storage
     */
    getItem(itemKey, defaultValue) { 

        var result = undefined;

        if (this.storage === undefined) return (false);

        result = this.storage.getItem(itemKey);

        return (result === undefined || result === null ? defaultValue : result);
    }

    /**
     * evaluates if the browser supports the storage (one of 'sessionStorage' or 'localStorage')
     * 
     * @param storage - one of 'sessionStorage' or 'localStorage'
     * 
     * @return true if this browser supports the storage
     */
    hasStorage(storage) {

        try {

            window[storage].setItem("exists", "1");
            window[storage].getItem("exists");
            window[storage].removeItem("exists");

            return (true);
        }
        catch (ex) { }

        return (false);
    }

    /**
     * removes the value associated to the itemKey from the JS session storage.
     * 
     * @param itemKey - itemKey of associated value to remove from session storage.
     * 
     * @return - returns false if the browser does not support JS session storage
     */
    removeItem(itemKey) {
        
        if (this.storage === undefined) return (false);

        this.storage.removeItem(itemKey);
    }

    /**
     * populates the JS session storage with the itemValue associated by itemKey.
     * 
     * @param itemKey - value associated to this key
     * @param itemValue - object / property to store in the session associated to the itemKey
     */
    setItem(itemKey, itemValue) {

        if (this.storage === undefined) return (false);

        this.storage[itemKey] = itemValue;
    }

    /**
     * attempts to populate the storage instance with the browser JS session storage if supported.
     */
    parseStorage() {

        if (this.hasStorage('sessionStorage')) {

            this.storage = window.sessionStorage;
        }
        else if (this.hasStorage('localStorage')) {

            this.storage = window.localStorage;
        }
    }
}

PersistedStorage.install = function(Vue, options) {

    Vue.prototype.$storage = new PersistedStorage();
}

export default PersistedStorage;