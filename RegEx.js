// let re1 = new RegExp('abc');
// let re2 = /abc/;
// let eighteenPlus = /eighteen\+/;
// let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
// let notBinary = /[^01]/;
// console.log(/'\d*'/.test("'123'"));
// console.log(/'\d*'/.test("''"));
// let neighbor = /neighbou?r/;
// console.log(neighbor.test("neighbour"));
// console.log(neighbor.test("neighbor"));

// function getDate(string) {
//     let [_, month, day, year] = /^(\d{1,2})-(\d{1,2})-(\d{4})$/.exec(string);
//     return new Date(year, month - 1, day);
// }

// ******************RegExp Golf**************************

// car and cat
let carCatRegExp = /car|cat/

// pop and prop
let popPropRegExp = /pop|prop/

// ferret, ferry, and ferrari
let ferRegExp = /ferret|ferry|ferrari/

// Any word ending in ious
let iousRegExp = /\b\w+ious$\b/

// A whitespace character followed by a period, comma, colon, or semicolon
let wspcRegEx = /\s(\.|,|:|;)+/

// A word longer than six letters
let sixRegExp = /\b\w{6}\w+\b/

// A word without the letter e (or E)
let notERegExp = /\b([^e\s]+)\b/