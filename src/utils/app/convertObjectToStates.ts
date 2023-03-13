// replace all object values with a new value
import { isImageString } from ".";
export default function convertObjectToStates(obj: any, parentName: any) {
  const objCopy = { ...obj };

  Object.keys(objCopy).forEach((key) => {
    const flattenName = parentName ? `${parentName}.${key}` : key;

    if (typeof objCopy[key] === "object") {
      objCopy[key] = {
        type: "group",
        id: flattenName,
        parentId: parentName,
        keyName: key,
        checked: false,
        expanded: true,
        indeterminate: false,
        children: convertObjectToStates(objCopy[key], flattenName),
      } as JSONItemType;
    } else {
      objCopy[key] = {
        type: "item",
        id: flattenName,
        parentId: parentName,
        keyName: key,
        checked: false,
        isImage: isImageString(objCopy[key]),
      } as JSONItemType;
    }
  });

  return objCopy as JSONItemType;
}
