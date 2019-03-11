if (!Array.prototype['$flatMap']) {
    Array.prototype['$flatMap'] = function (cb) {
        return this.map(cb).reduce((destArray, array) =>
            destArray.concat(array), []);
    };
}

if (!Array.prototype['$flat']) {
    Array.prototype['$flat'] = function () {
        return this.reduce((destArray, array) =>
            destArray.concat(array), []);
    };
}