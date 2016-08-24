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

    isDecimal: function() {
        return +this.value === +this.value;
    },

    isRoman: function() {
        if (this.isDecimal()) {
            return false;
        }

        var i = 0;
        while (i < this.value.length) {
            if (i+2 <= this.value.length &&
                this.value.substring(i, i+2) in this.symtable) {
                i += 2;
            } else if (this.value.substring(i, i+1) in this.symtable) {
                i += 1;
            } else {
                return false;
            }
        }

        // FIXME: more than three consecutive copies of the same letter are not allowed

        return true;
    },

    toInt: function() {
        if (this.decimal) {
            return this.decimal;
        };
        return 'not-implemented';
    },

    toString: function() {
        if (this.roman) {
            return this.roman;
        };

        var residous = this.value,
            result = '';

        while (residous > 0) {
            for (var s in this.symtable) {
                if (residous >= this.symtable[s]) {
                    residous %= this.symtable[s];
                    result += s;
                    break; 
                } 
            }
        }

        return result;
    }
};


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

        console.log(romanNumber1.isRoman());  // => true
        console.log(romanNumber1.toInt());  // => 20
        console.log(romanNumber1.toString());  // => 'XX'
        console.log(romanNumber2.isRoman());  // => false
        console.log(romanNumber2.toInt());  // => 40
        console.log(romanNumber2.toString());  // => 'XL'
        console.log(romanNumber3.toString());  // => 'MCMXCV'

        testObjs.forEach(function(str) {
            try {
                num = new RomanNumber(str);
                if (num.isDecimal()) {
                    var d = num.toInt();
                    console.log('Is "%s" equal to "%s"?', str, d, isEqual(str, d));
                }
                else {
                    console.log('%s is not an arabic number, not yet implemented', str);
                }
            }
            catch(e) {
                console.log(e.name + ': ' + e.message + ' (%s)', str);
            }
        });
    };

testRoman();
