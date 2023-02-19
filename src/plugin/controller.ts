import {
  figmaNotify,
  shuffleArray,
  shuffleChaotic,
  populateByLayerName,
  addSign,
  removeSign,
} from "../app/utils/figma";
import { pluginFrameSize } from "../data/pluginFrameSize";
import { skipSign } from "../data/skipSign";

const pluginName = "JSONtoFigmaPlugin";

// CLEAN STORAGE
// figma.clientStorage.setAsync(pluginName, null);

// SHOW UI
figma.showUI(__html__, {
  width: pluginFrameSize.width,
  height: pluginFrameSize.height,
});

const applyOptions = (
  obj: Array<any>,
  randomType: RandomValueTypes,
  range: {
    from: number;
    to: number;
  }
) => {
  console.log("applyOptions", obj, randomType, range);

  const randomiseObj = () => {
    switch (randomType) {
      case "normal":
        return shuffleArray(obj);
      case "chaotic":
        return shuffleChaotic(obj);
      default:
        return obj;
    }
  };

  const sliced = randomiseObj().slice(range.from - 1, range.to);

  return sliced;
};

// ON MESSAGE
figma.ui.onmessage = (msg) => {
  const isSelectionLength = figma.currentPage.selection.length !== 0;

  if (msg.type === "populate") {
    const selection = figma.currentPage.selection;
    const configData = msg.data as configDataType;
    // console.log("configData", configData);

    // Check if something selected

    // POPULATE
    if (!isSelectionLength) {
      figmaNotify("error", `Select something to populate matches`, 3000);
    } else {
      const modifiedData = applyOptions(
        configData.originalJSON,
        configData.randomType,
        configData.range
      );

      configData.checkedItems.map((selectedItem) => {
        populateByLayerName(selection, modifiedData, selectedItem);
      });
    }
  }

  // if we recived fetched images
  if (msg.type === "imgData") {
    const target = figma.currentPage.findOne((n) => n.id === msg.targetID);
    const imageHash = figma.createImage(msg.data).hash;

    const newFill = {
      type: "IMAGE",
      opacity: 1,
      blendMode: "NORMAL",
      scaleMode: "FILL",
      imageHash: imageHash,
    };
    target["fills"] = [newFill];
  }

  // "SKIP LAYERS" FUNCTIONS
  if (msg.type === "add-skip-sign") {
    if (isSelectionLength) {
      addSign(figma.currentPage.selection, skipSign);
    } else {
      figmaNotify("error", "Select some layers first", 3000);
    }
  }

  if (msg.type === "remove-skip-sign") {
    if (isSelectionLength) {
      removeSign(figma.currentPage.selection, skipSign);
    } else {
      figmaNotify("error", "Select some layers first", 3000);
    }
  }

  ///////////////////////
  // SERVICE FUNCTIONS //
  ///////////////////////

  // IF NO KEY SELECTED
  if (msg.type === "alert") {
    figmaNotify("error", msg.data, 3000);
  }

  if (msg.type === "copy") {
    console.log("copy", msg.text);
    figmaNotify("copy", msg.text, 3000);
  }

  // CHANGE SIZE
  if (msg.type === "initial-size") {
    figma.ui.resize(pluginFrameSize.width, pluginFrameSize.height);
  }
  if (msg.type === "change-size" || msg.type === "reset") {
    figma.ui.resize(pluginFrameSize.width, Math.round(msg.frameHeight));
  }
  if (msg.type === "manual-resize") {
    figma.ui.resize(Math.round(msg.size.width), Math.round(msg.size.height));
  }

  // STORAGE WORKAROUND
  if (msg.type === "set-storage") {
    // console.log("set-storage", msg);
    figma.clientStorage.setAsync(pluginName, JSON.stringify(msg.data));
  }

  if (msg.type === "get-storage") {
    figma.clientStorage.getAsync(pluginName).then((data) => {
      figma.ui.postMessage({
        type: "get-storage",
        data: JSON.parse(data) as configDataType,
      });
    });
  }

  if (msg.type === "clear-storage") {
    figma.clientStorage.setAsync(pluginName, null);
  }
};

figma.currentPage.setRelaunchData({ open: "" });
