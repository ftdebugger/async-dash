import {addTask} from './executor.js';

class AsyncDashContainer {
    constructor(promise) {
        this._promise = promise;
    }

    reduce(callback, initial) {
        return AsyncDashContainer.factory(this.then((array) => {
            return new Promise((resolve) => {
                var memo = initial;

                array.forEach((item, index) => addTask(() => memo = callback(memo, item, index)));

                addTask(() => resolve(memo));
            });
        }));
    }

    /**
     * @param {function(*, number)} callback
     * @returns {*}
     */
    map(callback) {
        return this.reduce((memo, item, index) => {
            memo.push(callback(item, index));

            return memo;
        }, []);
    }

    /**
     * @param {function(*, number)} callback
     * @returns {*}
     */
    forEach(callback) {
        return this.reduce((memo, item, index) => {
            callback(item, index);

            memo.push(item);

            return memo;
        }, []);
    }

    /**
     * @param {function(*, number)} callback
     * @returns {*}
     */
    filter(callback) {
        return this.reduce((memo, item, index) => {
            if (callback(item, index)) {
                memo.push(item);
            }

            return memo;
        }, []);
    }

    /**
     * @returns {Promise.<Array>}
     */
    promise() {
        return this._promise;
    }

    /**
     * @param {function} args
     * @returns {Promise.<Array>}
     */
    then(...args) {
        return this.promise().then(...args);
    }

    /**
     * @param {Promise.<Array>} promise
     * @returns AsyncDashContainer
     */
    static factory(promise) {
        return new AsyncDashContainer(promise);
    }

    /**
     * @param {*[]} array
     * @returns AsyncDashContainer
     */
    static chain(array) {
        return AsyncDashContainer.factory(Promise.resolve(array));
    }
}

// Export

let chain = (array) => AsyncDashContainer.chain(array);
let wrap = function (func) {
    return function (array) {
        return chain(array)[func](...[].slice.call(arguments, 1));
    };
};

let map = wrap('map');
let filter = wrap('filter');
let reduce = wrap('reduce');
let forEach = wrap('forEach');

export {chain, reduce, map, forEach, filter};
