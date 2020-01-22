class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  try {
  	return primitiveMultiply(a, b);
  } catch (e) {
    if (e instanceof MultiplicatorUnitFailure) {
     console.log(e);
     return reliableMultiply(a, b);
    }
  }
}

// console.log(reliableMultiply(8, 8));
// → 64

const box = {
    locked: true,
    unlock() { this.locked = false; }, 
    lock() { this.locked = true; },
    _content: [],
    get content() {
        if (this.locked) throw new Error("Locked");
        return this._content;
    }
};

const withBoxUnlocked = (body) => {
    let progress = 0;

    try {
        if (box.locked) {
            box.unlock();
            progress = 1;
    
            body();
            progress = 2;
    
            // ensure box is locked before returning, whether or not body() succeeded
            box.lock(); 
        } else {
            console.log("box unlocked")
            progress = 3;
    
            body();
            progress = 4;
        }
    } catch (e) {
        console.log(e);
        if (progress === 1) {
            box.lock();
        }
    }
}

withBoxUnlocked(function() {
    box.content.push("gold piece");
});

try {
    withBoxUnlocked(function() {
        throw new Error("Pirates on the horizon! Abort!");
    });
} catch (e) {
    console.log("Error raised: " + e);
}

console.log(box.locked);
// -> true
