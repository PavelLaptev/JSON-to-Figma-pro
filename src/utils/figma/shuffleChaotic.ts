export default function shuffleChaotic(arr) {
  // get all keys of the first object
  const keys = Object.keys(arr[0]);

  // iterate over the keys
  for (const key of keys) {
    // shuffle the values of the key between objects
    for (let i = 0; i < arr.length - 1; i++) {
      const j = Math.floor(Math.random() * (arr.length - i)) + i;
      const temp = arr[i][key];
      arr[i][key] = arr[j][key];
      arr[j][key] = temp;
    }
  }

  return arr;
}
