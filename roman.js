/** Class RomanNumber that takes a value and returns
 *  a new object that can be used in the following way:
 *
 *     var romanNumber1 = new RomanNumber('XX');
 *     var romanNumber2 = new RomanNumber(40);
 *
 *     console.log(romanNumber1.toInt());  // => 20
 *     console.log(romanNumber1.toString());  // => 'XX'
 *     console.log(romanNumber2.toInt());  // => 40
 *     console.log(romanNumber2.toString());  // => 'XL'
 */

"use strict";

(function() {

    var symtable = [
        { roman: 'M',  arabic: 1000 },
        { roman: 'CM', arabic:  900 },
        { roman: 'D',  arabic:  500 },
        { roman: 'CD', arabic:  400 },
        { roman: 'C',  arabic:  100 },
        { roman: 'XC', arabic:   90 },
        { roman: 'L',  arabic:   50 },
        { roman: 'XL', arabic:   40 },
        { roman: 'X',  arabic:   10 },
        { roman: 'IX', arabic:    9 },
        { roman: 'V',  arabic:    5 },
        { roman: 'IV', arabic:    4 },
        { roman: 'I',  arabic:    1 }
    ];

    var RomanNumber = function(value) {
        if (!(this instanceof RomanNumber)) {
            return new RomanNumber(value);
        };

        this.value = value;
        this.decimal = null;
        this.roman = null;

        // validate the input
        this.validateInput(value);
    };

    RomanNumber.prototype = {
        /** this function validates the input number;
         *  an exception is raised when the input is not valid
         */
        validateInput: function() {
            if (this.value == null || this.value.length === 0) {
                throw new Error("value required");
            };
            if (this.isDecimal()) {
                if (this.value < 1 || this.value > 3999) {
                    throw new Error("invalid range");
                };
                // this.value is a valid decimal number
                this.decimal = this.value;
            } else if (this.isRoman()) {
                // this.value is a valid roman number
                this.roman = this.value;
            }
            else {
                throw new Error("invalid value");
            }
        },

        /** helper function that looks in 'symtable' for the substring
         *  of 'this.value' with length 'delta' and starting at position 'pos'
         */
        symtableLookup: function(pos, delta) {
            if (pos + delta > this.value.length) {
                return false;
            };

            var sstr = this.value.substring(pos, pos + delta);
            for (var i in symtable) {
                if (symtable[i].roman === sstr) {
                    return {
                        pos: i,
                        value: symtable[i].arabic
                    };
                }
            };
            return { pos: null, value: null };
        },

        /** returns true if the number is in Arabic format */
        isDecimal: function() {
            return Number.isInteger(this.value);
        },

        /** returns true if the number is a standard Roman number */
        isRoman: function() {
            if (this.isDecimal()) {
                return false;
            }

            var i = 0;
            while (i < this.value.length) {
                if (this.symtableLookup(i, 2).pos) {
                    i += 2;
                } else if (this.symtableLookup(i, 1).pos) {
                    i += 1;
                } else {
                    return false;
                }
            }

            // more than three consecutive copies of the same letter are not allowed
            var wrongPatterns = [
                'MMMM', 'CCCC', 'DDDD', 'LLLL', 'XXXX', 'VVVV', 'IIII'
            ];
            for (var i in wrongPatterns) {
                if (this.value.indexOf(wrongPatterns[i]) !== -1) {
                     return false;
                };
            }
            return true;
        },

        /** translates the imput number into the Arabic format */
        toInt: function() {
            if (this.decimal) {
                return this.decimal;
            };

            var i = 0,
                result = 0, sym;

            while (i < this.value.length) {
                sym = this.symtableLookup(i, 2);
                if (sym.value) {
                    result += sym.value;
                    i += 2;
                    continue;
                };

                sym = this.symtableLookup(i, 1);
                if (sym.value) {
                    result += sym.value;
                    i += 1;
                    continue;
                };

                throw new Error("invalid value");
            }

            return this.decimal = result;
        },

        /** translates the imput number into the Roman format */
        toString: function() {
            if (this.roman) {
                return this.roman;
            };

            var residuos = this.value,
                result = '';

            while (residuos > 0) {
                for (var i in symtable) {
                    if (residuos >= symtable[i].arabic) {
                        residuos -= symtable[i].arabic;
                        result += symtable[i].roman;
                        break;
                    }
                }
            }

            return this.roman = result;
        }
    };

    module.exports = RomanNumber;

}());

