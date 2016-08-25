var RomanNumber = require('./roman');

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
