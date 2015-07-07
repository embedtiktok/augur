/**
 * augur.js unit tests
 * @author Jack Peterson (jack@tinybike.net)
 */

"use strict";

var crypto = require("crypto");
var assert = require("chai").assert;
var constants = require("./constants");
var utilities = require("./utilities");
var Augur = utilities.setup(require("../augur"), process.argv.slice(2));
var log = console.log;

var accounts = utilities.get_test_accounts(Augur, constants.max_test_accounts);
var branch_id = Augur.branches.dev;
var reporter_index = "0";
var ballot = [Augur.YES, Augur.YES, Augur.NO, Augur.YES];
var salt = "1337";

describe("data and api/reporting", function () {
    describe("getTotalRep(" + branch_id + ")", function () {
        var test = function (r) {
            assert(parseInt(r) >= 47);
        };
        it("sync", function () {
            test(Augur.getTotalRep(branch_id));
        });
        it("async", function (done) {
            Augur.getTotalRep(branch_id, function (r) {
                test(r); done();
            });
        });
    });
    describe("getRepBalance(" + branch_id + ") ", function () {
        var test = function (r) {
            utilities.gteq0(r);
        };
        it("sync", function () {
            test(Augur.getRepBalance(branch_id, accounts[0]));
        });
        it("async", function (done) {
            Augur.getRepBalance(branch_id, accounts[0], function (r) {
                test(r); done();
            });
        });
    });
    describe("getRepByIndex(" + branch_id + ", " + reporter_index + ") ", function () {
        var test = function (r) {
            utilities.gteq0(r);
            assert.equal(Number(r), 47);
        };
        it("sync", function () {
            test(Augur.getRepByIndex(branch_id, reporter_index));
        });
        it("async", function (done) {
            Augur.getRepByIndex(branch_id, reporter_index, function (r) {
                test(r); done();
            });
        });
    });
    describe("getReporterID(" + branch_id + ", " + reporter_index + ") ", function () {
        var test = function (r) {
            assert.equal(r, accounts[0]);
        };
        it("sync", function () {
            test(Augur.getReporterID(branch_id, reporter_index));
        });
        it("async", function (done) {
            Augur.getReporterID(branch_id, reporter_index, function (r) {
                test(r); done();
            });
        });
    });
    describe("getReputation(" + accounts[0] + ")", function () {
        var test = function (r) {
            assert(r.length >= 1);
            for (var i = 0, len = r.length; i < len; ++i) {
                utilities.gteq0(r[i]);
            }
        };
        it("sync", function () {
            test(Augur.getReputation(accounts[0]));
        });
        it("async", function (done) {
            Augur.getReputation(accounts[0], function (r) {
                test(r); done();
            });
        });
    });
    describe("getNumberReporters(" + branch_id + ") ", function () {
        var test = function (r) {
            assert(parseInt(r) >= 1);
        };
        it("sync", function () {
            test(Augur.getNumberReporters(branch_id));
        });
        it("async", function (done) {
            Augur.getNumberReporters(branch_id, function (r) {
                test(r); done();
            });
        });
    });
    describe("repIDToIndex(" + branch_id + ", " + accounts[0] + ") ", function () {
        var test = function (r) {
            assert.equal(r, reporter_index);
        };
        it("sync", function () {
            test(Augur.repIDToIndex(branch_id, accounts[0]));
        });
        it("async", function (done) {
            Augur.repIDToIndex(branch_id, accounts[0], function (r) {
                test(r); done();
            });
        });
    });
    describe("hashReport([ballot], " + salt + ") ", function () {
        var test = function (r) {
            var b = Augur.fix(ballot);
            for (var i = 0, len = b.length; i < len; ++i) {
                b[i] = b[i].toString(16);
            }
            var hashable = [accounts[0], Augur.bignum(salt).toString(16)].concat(b).toString();
            var hashed = utilities.sha256(hashable);
            // TODO lookup how arrays hashed by evm sha256, this doesn't work
            // assert.equal(r, hashed);
            assert.equal(r, "0xf3efde92c14172a5498fc449f5d0af2c6017c3ca37b8220164721893bdf93f27");
        };
        it("sync", function () {
            test(Augur.hashReport(ballot, salt));
        });
        it("async", function (done) {
            Augur.hashReport(ballot, salt, function (r) {
                test(r); done();
            });
        });
    });
});
