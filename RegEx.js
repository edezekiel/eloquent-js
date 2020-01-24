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

// ****************** RegExp Golf **************************

// car and cat
let carCatRegExp = /ca[rt]/

// pop and prop
let popPropRegExp = /pr?op/

// ferret, ferry, and ferrari
let ferRegExp = /ferr[(et)(y)(ari)]+/

// Any word ending in ious
let iousRegExp = /\b\w+ious$\b/

// A whitespace character followed by a period, comma, colon, or semicolon
let wspcRegEx = /\s[\.,:;]/

// A word longer than six letters
let sixRegExp = /\w{7}}/

// A word without the letter e (or E)
let notERegExp = /\b([^\We]+)\b/i

// ****************** Quoting Style **************************

let singleQuoteRegExp = /(^')|('$)|(\s')|('\s)/g;

console.log(text.replace(/(^|\s)'|'($|\s)/g, '$1"$2'));

let numsRegEx = /^(\+|-)?(\.?\d+|\d+\.?|\d+\.\d+)(e(\+|-)?\d+)?$/i;

// (^')|('$)|(\s')|('\s) - matches correctly, but hard to use with replace
// (?!\w'\w)