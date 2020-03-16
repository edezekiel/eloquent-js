// callback -> flatReducer
// initialValue -> []
const flattenArray = (arr) => arr.reduce(flatReducer, []);

const flatReducer = (accumulator, currentValue) => {
    // If current value is not an array, concat it to the accumulator.
    // Otherwise, trigger recursive call to flatten
    return accumulator.concat(Array.isArray(currentValue) ? flattenArray(currentValue) : currentValue);
}
  
flattenArray([1, [2], [3, [[4]]]]);