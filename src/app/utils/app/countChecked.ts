const countChecked = (obj: JSONItemType) => {
  let count = 0;

  const countCheckedItems = (obj: JSONItemType) => {
    Object.values(obj).map((item: JSONItemType) => {
      if (item.checked) {
        count++;
      }

      if (item.type === "group") {
        countCheckedItems(item.children);
      }
    });
  };

  countCheckedItems(obj);

  return count;
};

export default countChecked;
