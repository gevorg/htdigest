"use strict";

// FS.
import fs from 'fs'

// Expect module.
import {expect} from 'chai';

// Source.
import * as processor from '../gensrc/processor'

// Processor.
describe('processor', function () {
    // Tests for syncFile.
    describe('#syncFile', function () {
        afterEach(function() {
            if (fs.existsSync("password.txt")) {
                fs.unlinkSync("password.txt");
            }
        });

        it('file create', function () {
            // Input.
            let program = {
                'create': true,
                'args': ["password.txt", "sho", "gevorg", "loser"]
            };

            // Source.
            processor.syncFile(program);

            // Expectation.
            let fileData = fs.readFileSync("password.txt", 'UTF-8');
            expect(fileData).to.equal("gevorg:sho:c188621dd651b5d3da4d3a1d3553ebcb\n");
        });

        it('file update', function () {
            // Prepare file.
            fs.writeFileSync("password.txt", "gevorg:sho:c188621dd651b5d3da4d3a1d3553ebcb", 'UTF-8');

            // Input.
            let program = {
                'args': ["password.txt", "sho", "gevorg", "winner"]
            };

            // Source.
            processor.syncFile(program);

            // Expectation.
            let fileData = fs.readFileSync("password.txt", 'UTF-8');
            expect(fileData).to.equal("gevorg:sho:8acff7c997e8afb4831290c93db09c95\n");
        });

        it('file add', function () {
            // Prepare file.
            let initData = "gevorg:sho:8acff7c997e8afb4831290c93db09c95";
            fs.writeFileSync("password.txt", initData, 'UTF-8');

            // Input.
            let program = {
                'args': ["password.txt", "thegreat", "tigran", "sea"]
            };

            // Source.
            processor.syncFile(program);

            // Expectation.
            let fileData = fs.readFileSync("password.txt", 'UTF-8');
            expect(fileData).to.equal(`${initData}\ntigran:thegreat:07e9e983c2c8d2c20826350dae5e72fc\n`);
        });

        it('file add, not existing', function () {
            // Input.
            let program = {
                'args': ["password.txt", "losers", "serob", "dragon"]
            };

            let preservedLog = console.log;
            console.error = function () {
                console.error = preservedLog;
                console.error.apply(console, arguments);

                expect(arguments[0]).to.equal("Cannot modify file password.txt; use '-c' to create it.");
            };

            // Source.
            processor.syncFile(program);
        });
    });
});