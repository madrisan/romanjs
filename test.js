"use strict";

var assert = require('assert')
  , RomanNumber;

describe('Tests for the class RomanNumber()', function() {
    before(function() {
        RomanNumber = require('./roman');
    });

    it('an exception is thrown if the input is null', function(done) {
        assert.throws(() => { new RomanNumber(null); }, /value required/);
        done();
    });

    it('an exception is thrown if the input is an empty string', function(done) {
        assert.throws(() => { new RomanNumber(''); }, /value required/);
        done();
    });

    it('an exception is thrown if the input is a number out of range', function(done) {
        assert.throws(() => { new RomanNumber(0); }, /invalid range/);
        assert.throws(() => { new RomanNumber(10000); }, /invalid range/);
        done();
    });

    it('an exception is thrown if the input is a number in string format', function(done) {
        assert.throws(() => { new RomanNumber('1473'); }, /invalid value/);
        done();
    });

    it('an exception is thrown if the input string is not a roman', function(done) {
        assert.throws(() => { new RomanNumber('CD1X'); }, /invalid value/);
        assert.throws(() => { new RomanNumber('error'); }, /invalid value/);
        done();
    });

    it('an exception is thrown if a symbol appears more than three consecutive times', function(done) {
        var testObjs = [
            'IIII', 'MMMMCMXCIX', 'MMMMDMXCIX'
        ];
        testObjs.forEach(function(number) {
            assert.throws(
                () => { new RomanNumber(number); },
                /invalid value/,
                'exception should be raised for ' + number
            );
        });
        done();
    });

    it('valid inputs are accepted', function(done) {
        var testObjs = [
            1, 3, 4, 5,
            'I', 'III', 'IV', 'V',
            1968, 2999, 3000,
            'CDXXIX', 'MCDLXXXII', 'MCMLXXX'
        ];
        testObjs.forEach(function(number) {
            assert.doesNotThrow(() => { new RomanNumber(number); }, 'got unwanted exception for ' + number);
        });
        done();
    });

    it('roman to arabic conversion (XX)', function(done) {
        var romanNumber = new RomanNumber('XX');
        assert.equal(romanNumber.toInt(), '20');
        done();
    });

    it('arabic to roman conversion (40)', function(done) {
        var romanNumber = new RomanNumber(40);
        assert.equal(romanNumber.toString(), 'XL');
        done();
    });

    it('arabic to roman conversion (1995)', function(done) {
        var romanNumber = new RomanNumber(1995);
        assert.equal(romanNumber.toString(), 'MCMXCV');
        done();
    });

});
