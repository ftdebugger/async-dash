import {expect} from 'chai';
import chai from 'chai';

import {addTask} from '../lib/executor.js';

describe('executor', function () {

    it('execute task', function (done) {
        addTask(done);
    });

    it('all tasks are async', function () {
        let count = 0;

        addTask(_ => count++);

        expect(count).to.equal(0);
    });

    it('FIFO', function (done) {
        let count = 0;

        for (let i = 0; i < 10; i++) {
            addTask(_ => count++);
        }

        addTask(_ => {
            expect(count).to.equal(10);
            done();
        });
    });

});
