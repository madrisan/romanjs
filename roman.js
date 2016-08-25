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
var RomanNumber = function(value) {
    obj = Object.create(RomanNumber.prototype);
    obj.value = value;

    obj.decimal = null;
    obj.roman = null;

    obj.symtable = {
        'M'  : 1000,
        'CM' :  900,
        'D'  :  500,
        'CD' :  400,
        'C'  :  100,
        'XC' :   90,
        'L'  :   50,
        'XL' :   40,
        'X'  :   10,
        'IX' :    9,
        'V'  :    5,
        'IV' :    4,
        'I'  :    1
    };

    // validate the input
    obj.validateInput(value);

    return obj;
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

    /** helper function that returns true if the substring
     *  'this.value' starting at position 'pos' and with length
     *  'delta' can be found in the table 'this.symtable'
     */
    symtableLookup: function(pos, delta) {
        if (pos + delta > this.value.length) {
            return false;
        };

        if (this.value.substring(pos, pos + delta) in this.symtable) {
            return true;
        };

        return false;
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
            if (this.symtableLookup(i, 2)) {
                i += 2;
            } else if (this.symtableLookup(i, 1)) {
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
            result = 0;

        while (i < this.value.length) {
            if (this.symtableLookup(i, 2)) {
                result += this.symtable[this.value.substring(i, i+2)];
                i += 2;
            } else if (this.symtableLookup(i, 1)) {
                result += this.symtable[this.value.substring(i, i+1)];
                i += 1;
            } else {
                throw new Error("invalid value");
            }
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
            for (var s in this.symtable) {
                if (residuos >= this.symtable[s]) {
                    residuos -= this.symtable[s];
                    result += s;
                    break; 
                } 
            }
        }

        return this.roman = result;
    }
};

module.exports = RomanNumber;


// tests
var testObjs = [
        null, '', 0, 1, 3, 4, 5,
        'I', 'III', 'IIII', 'IV', 'V',
        1968, '1473', 2999, 3000, 10000,
        'CDXXIX', 'CD1X', 'error', 'MCDLXXXII', 'MCMLXXX',
        'MMMMCMXCIX', 'MMMMDMXCIX'
    ],

    isEqual = function(str1, str2) {
        return str1 === str2 ? 'Yes' : 'False';
    },

    testRoman = function() {
        var romanNumber1 = new RomanNumber('XX');
        var romanNumber2 = new RomanNumber(40);
        var romanNumber3 = new RomanNumber(1995);

        console.log("XX is equal to 20: " + isEqual(20, romanNumber1.toInt()));
        console.log("XX is equal to XX: " + isEqual('XX', romanNumber1.toString()));
        console.log("40 is equal to XL: " + isEqual('XL', romanNumber2.toString()));
        console.log("1995 is equal to MCMXCV: " + isEqual('MCMXCV', romanNumber3.toString()));

        testObjs.forEach(function(str) {
            try {
                var num = new RomanNumber(str);
                if (num.isDecimal()) {
                    console.log('%s is an arabic number, in roman notation: %s', str, num.toString());
                }
                else if (num.isRoman()) {
                    console.log('%s is a roman number, in arabic notation: %s', str, num.toInt());
                }
            }
            catch(e) {
                console.log(e.name + ': ' + e.message + ' (%s)', str);
            }
        });
    };

testRoman();
