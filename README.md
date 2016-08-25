# romanjs
### Roman to Arabic JavaScript library

This is a just a test.

<dl>
    <dt><em>Start time:</em></dt>
    <dd>Wed Aug 24 18:30:48 CEST 2016</dd>
    <dt><em>End time:</em></dt>
    <dd>Wed Aug 24 21:55:35 CEST 2016</dd>
    <dt><em>With some documentation and better code:</em></dt>
    <dd>Wed Aug 24 23:36:54 CEST 2016</dd>
    <dt><em>With the tests moved to the (gulp-)mocha framework:</em></dt>
    <dd>Thu Aug 25 23:40:11 CEST 2016</dd>
</dl>

_Usage:_

```javascript
var RomanNumber = require('./roman');

var roman = RomanNumber(1995).toString();
console.log('1995 <--> %s', roman);

var arabic = RomanNumber('XL').toInt();
console.log('XL <--> %s', arabic);

```

_Note:_
The tests can be executed by running the command `npm run test`.
