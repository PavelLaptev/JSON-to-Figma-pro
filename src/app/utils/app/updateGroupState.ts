import findObjItem from "./findObjItem";

// const allParentGroups = (states: JSONItemType, parentGroup: JSONItemType) => {
//   const parentGroups = [];
//   let parent = parentGroup;
//   while (parent.parentId) {
//     parent = findObjItem(states, parent.parentId) as JSONItemType;
//     parentGroups.push(parent);
//   }
//   return parentGroups;
// };

// replace all object values with a new value
export default function updateGroupState(
  states: JSONItemType,
  parentId: string
) {
  // console.log(parentGroup);
  const parentGroup = findObjItem(states, parentId) as JSONItemType;

  if (parentGroup && parentGroup.id) {
    const childrenLength = Object.keys(parentGroup.children).length;
    const overallChecked = Object.values(parentGroup.children).filter(
      (child: any) => child.checked
    ).length;

    if (childrenLength === overallChecked) {
      parentGroup.checked = true;
      parentGroup.indeterminate = false;
    }

    if (overallChecked === 0) {
      // console.log("unchecked");
      parentGroup.checked = false;
      parentGroup.indeterminate = false;
    }

    if (overallChecked > 0 && overallChecked < childrenLength) {
      console.log("indeterminate");
      parentGroup.checked = false;
      parentGroup.indeterminate = true;
    }
  }

  return null;
}
