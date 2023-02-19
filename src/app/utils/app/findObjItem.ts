const findObjItem = (json: any, id: string) => {
  const values = Object.values(json).filter(Boolean);

  //find the object with the id in nested objects
  const obj = values.find((item: any) => item.id === id);

  // if object not found, recursively search nested objects
  if (!obj) {
    for (const value of values) {
      if (typeof value === "object") {
        const found = findObjItem(value, id);
        if (found) {
          return found;
        }
      }
    }
  }

  return obj;
};

export default findObjItem;
