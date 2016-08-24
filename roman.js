var RomanNumber = function(value) {
    obj = Object.create(RomanNumber.prototype);
    obj.value = value;

    return obj;
};

RomanNumber.prototype = {

    toInt: function() {
        return 'toInt(' + this.value + ')';
    },

    toString: function() {
        return 'toString(' + this.value + ')';
    }
};


var romanNumber0 = new RomanNumber();
var romanNumber0 = new RomanNumber('');
var romanNumber1 = new RomanNumber('XX');
var romanNumber2 = new RomanNumber(40);

console.log(romanNumber1.toInt());  // => 20
console.log(romanNumber1.toString());  // => 'XX'

console.log(romanNumber2.toInt());  // => 40
console.log(romanNumber2.toString());  // => 'XL'
