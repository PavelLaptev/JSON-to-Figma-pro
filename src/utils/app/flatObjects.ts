const flatObjects = (arr: [any]) => {
  const flattenObject = (obj, parentKey = "") => {
    const flattenedObj = {};
    for (const [key, value] of Object.entries(obj)) {
      const newKey = parentKey ? `${parentKey}.${key}` : key;
      if (typeof value === "object" && value !== null) {
        Object.assign(flattenedObj, flattenObject(value, newKey));
      } else {
        flattenedObj[newKey] = value;
      }
    }
    return flattenedObj;
  };

  return arr.map((obj) => flattenObject(obj));
};

export default flatObjects;
