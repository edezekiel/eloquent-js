function* powers(n) {
  for (let current = n;; current *= n) {
    yield current;
  }
}

const myFunc = () => {
    for (let power of powers(3)) {
    if (power > 100) break;
    console.log(power);
  }
}

export { myFunc }
