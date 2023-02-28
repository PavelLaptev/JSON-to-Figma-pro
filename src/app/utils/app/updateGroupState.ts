import findObjItem from "./findObjItem";

// replace all object values with a new value
export default function updateGroupState(
  states: JSONItemType,
  parentId: string
) {
  const parentGroup = findObjItem(states, parentId) as JSONItemType;

  if (parentGroup && parentGroup.id) {
    updateGroup(parentGroup);
  } else {
    const rootGroup = findObjItem(states, "rootJSONItems") as JSONItemType;
    updateGroup(rootGroup);
  }

  return null;
}

function updateGroup(group: JSONItemType) {
  const childrenLength = Object.keys(group.children).length;
  const overallChecked = Object.values(group.children).filter(
    (child: any) => child.checked
  ).length;

  if (childrenLength === overallChecked) {
    group.checked = true;
    group.indeterminate = false;
  } else if (overallChecked === 0) {
    group.checked = false;
    group.indeterminate = false;
  } else {
    group.checked = false;
    group.indeterminate = true;
  }
}
