export default function convertObjectArraysToObjects(obj: any) {
  // check if the input is an object
  if (typeof obj !== "object" || obj === null) {
    console.log("Input is not a valid object.");
    return obj;
  }
  // iterate through the properties of the object
  for (const key in obj) {
    // check if the property is an array
    if (Array.isArray(obj[key])) {
      // convert the array to an object with the index as the key
      obj[key] = obj[key].reduce((acc, val, i) => {
        acc[i] = val;
        return acc;
      }, {});
    }
    // check if the property is an object
    if (typeof obj[key] === "object" && obj[key] !== null) {
      // recursively call the function
      obj[key] = convertObjectArraysToObjects(obj[key]);
    }
  }
  return obj;
}
