"use strict";

// Expect module.
const expect = require('chai').expect;

// Source.
const utils = require('../src/utils');

// Utils
describe('utils', () => {
    // Tests for md5
    describe('#md5', () => {
        it('hash should be correct', () => {
            // Source.
            let hash = utils.md5("devochka");

            // Expectation.
            expect(hash).to.equal("490db6b7628ee087f416f954682d0b08");
        });
    });

    // Tests for encode
    describe('#encode', () => {
        it('encoded result should be correct', () => {
            // Prepare input.
            let input = {
                'args': ["password.txt", "superRealm", "superUser"]
            };

            // Source.
            let encoded = utils.encode(input);

            // Expectation.
            expect(encoded).to.equal("superUser:superRealm:d60f8a9654592b85bfc0474dfa604906");
        });
    });
});
