"use strict";

// Expect module.
import {expect} from 'chai'

// Source.
import * as utils from '../gensrc/utils'

// Utils
describe('utils', function () {
    // Tests for md5
    describe('#md5', function () {
        it('hash should be correct', function () {
            // Source.
            let hash = utils.md5("devochka");

            // Expectation.
            expect(hash).to.equal("490db6b7628ee087f416f954682d0b08");
        });
    });

    // Tests for encode
    describe('#encode', function () {
        it('encoded result should be correct', function () {
            // Prepare input.
            var input = {
                'args': ["password.txt", "superRealm", "superUser"]
            };

            // Source.
            let encoded = utils.encode(input);

            // Expectation.
            expect(encoded).to.equal("superUser:superRealm:d60f8a9654592b85bfc0474dfa604906");
        });
    });
});
