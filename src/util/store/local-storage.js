
export class Storage {

    set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    remove(key) {
        window.localStorage.removeItem(key);
    }

    hasItem(key) {
        return !!window.localStorage.getItem(key);
    }

    findItem(key) {
        if (this.hasItem(key)) {
            return JSON.parse(window.localStorage.getItem(key));
        } else {
            return null;
        }
    }
}
