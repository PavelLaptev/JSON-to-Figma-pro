import figmaNotify from "./figmaNotify";

export default function populateByLayerName(
  selectedLayers,
  JSONobj,
  selectedItem
) {
  let newItem = 0;

  const loopSelected = (arr) => {
    arr.map((item) => {
      if (!item.locked) {
        if (
          item.name.toUpperCase() === selectedItem.toUpperCase() &&
          item.type === "TEXT"
        ) {
          figma.loadFontAsync(item.fontName).then(() => {
            if (typeof JSONobj[newItem] !== "undefined") {
              item.characters = JSONobj[newItem]?.[selectedItem].toString();
              newItem = ++newItem;
            }
          });
        }

        // If Figma item is not a text layer, it's an image
        if (
          item.name.toUpperCase() === selectedItem.toUpperCase() &&
          item.type !== "TEXT"
        ) {
          if (JSONobj.hasOwnProperty(newItem)) {
            if (newItem === 0) {
              figmaNotify("Fetching images...", 1000);
            }

            figma.ui.postMessage({
              type: "image-url",
              url: JSONobj[newItem][selectedItem].toString(),
              targetID: item.id,
              index: newItem,
            });
            newItem = ++newItem;
          }
        }

        if (item.children) {
          loopSelected(item.children);
        }
        return;
      }
    });
  };
  loopSelected(selectedLayers);
}
