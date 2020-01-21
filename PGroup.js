class PGroup {
    constructor(arr) {
      this.entries = arr;
  }

  add(val) {
      if (!(this.has(val))) {
          return new PGroup(this.entries.concat(val));
      }
  }

  delete(val) {
      if ((this.has(val))) {
          return new PGroup(this.entries.filter(entry => entry !== val));
      }
  }

  has(val) {
      return this.entries.includes(val);
  }

}

PGroup.empty = new PGroup([]);

console.log(PGroup.empty);

let a = PGroup.empty.add("a");
console.log(a)
let ab = a.add("b");
console.log(ab)
let b = ab.delete("a");
console.log(b)

console.log(b.has("b"));
// → true
console.log(a.has("b"));
// → false
console.log(b.has("a"));
// → false