export default function convertObjectArraysToString(obj: any) {
  const objCopy = { ...obj };
  // check if the input is an object
  if (typeof objCopy !== "object" || objCopy === null) {
    console.log("Input is not a valid object.");
    return objCopy;
  }
  // iterate through the properties of the object
  for (const key in objCopy) {
    // check if the property is an array
    if (Array.isArray(objCopy[key])) {
      // convert the array to string
      objCopy[key] = objCopy[key].join(", ");
    }
    // check if the property is an object
    if (typeof objCopy[key] === "object" && objCopy[key] !== null) {
      // recursively call the function
      objCopy[key] = convertObjectArraysToString(objCopy[key]);
    }
  }
  return objCopy;
}
