// replace all object values with a new value
export default function updateGroupState(parentGroup: JSONItemType) {
  if (parentGroup && parentGroup.id) {
    const childrenLength = Object.keys(parentGroup.children).length;
    const overallChecked = Object.values(parentGroup.children).filter(
      (child: any) => child.checked
    ).length;

    // console.log(childrenLength, overallChecked);

    if (childrenLength === overallChecked) {
      parentGroup.checked = true;
      parentGroup.indeterminate = false;
    }

    if (overallChecked === 0) {
      parentGroup.checked = false;
      parentGroup.indeterminate = false;
    }

    if (overallChecked > 0 && overallChecked < childrenLength) {
      parentGroup.checked = false;
      parentGroup.indeterminate = true;
    }
  }

  return null;
}
