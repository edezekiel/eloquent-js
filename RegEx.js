let re1 = new RegExp('abc');
let re2 = /abc/;
let eighteenPlus = /eighteen\+/;
let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
let notBinary = /[^01]/;
console.log(/'\d*'/.test("'123'"));
console.log(/'\d*'/.test("''"))
let neighbor = /neighbou?r/;
console.log(neighbor.test("neighbour"))
console.log(neighbor.test("neighbor"))