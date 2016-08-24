var RomanNumber = function(value) {
    obj = Object.create(RomanNumber.prototype);
    obj.value = value;

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
            }
        } else if (this.isRoman()) {
            // ADD-ME
        } 
        else {
            throw new Error("invalid value");
        }
    },

    isDecimal: function() {
        return +this.value === +this.value;
    },

    isRoman: function() {
        return true;  // FIXME
    },

    toInt: function() {
        return this.isDecimal() ? this.value : 'not-implemented';
    },

    toString: function() {
        return this.isDecimal() ? 'not-implemented' : this.value;
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

        console.log(romanNumber1.toInt());  // => 20
        console.log(romanNumber1.toString());  // => 'XX'
        console.log(romanNumber2.toInt());  // => 40
        console.log(romanNumber2.toString());  // => 'XL'

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
