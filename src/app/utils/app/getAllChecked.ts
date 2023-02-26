const getAllChecked = (obj: JSONItemType) => {
  const selectedArray: string[] = [];
  const getChecked = (obj: JSONItemType) => {
    Object.values(obj).map((item: JSONItemType) => {
      if (item.checked && item.type === "item") {
        // remove first word before dot
        selectedArray.push(item.id);
      }
      if (item.type === "group") {
        getChecked(item.children);
      }
    });
  };
  getChecked(obj);
  return selectedArray;
};

export default getAllChecked;
