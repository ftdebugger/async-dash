import {expect} from 'chai';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import {chain, reduce, forEach, map, filter} from '../lib/lodash.js';

chai.use(chaiAsPromised);

describe('lodash', function () {

    describe('chain', function () {

        it('base', function () {
            return expect(chain([1, 2, 3])).to.be.eventually.eql([1, 2, 3]);
        });

        it('reduce', function () {
            return expect(chain([1, 2, 3]).reduce(((m, v) => m + v), 0)).to.be.eventually.equal(6);
        });

        it('forEach', function () {
            return expect(chain([1, 2, 3]).forEach(a => a)).to.be.eventually.eql([1, 2, 3]);
        });

        it('map', function () {
            return expect(chain([1, 2, 3]).map(a => a * 2)).to.be.eventually.eql([2, 4, 6]);
        });

        it('filter', function () {
            return expect(chain([1, 2, 3]).filter(a => a % 2)).to.be.eventually.eql([1, 3]);
        });
    });

    describe('methods', function () {

        it('reduce', function () {
            return expect(reduce([1, 2, 3], ((m, v) => m + v), 0)).to.be.eventually.equal(6);
        });

        it('forEach', function () {
            return expect(forEach([1, 2, 3], a => a)).to.be.eventually.eql([1, 2, 3]);
        });

        it('map', function () {
            return expect(map([1, 2, 3], a => a * 2)).to.be.eventually.eql([2, 4, 6]);
        });

        it('filter', function () {
            return expect(filter([1, 2, 3], a => a % 2)).to.be.eventually.eql([1, 3]);
        });

    });

});
