import {
  figmaNotify,
  shuffleArray,
  shuffleChaotic,
  populateByLayerName,
} from "../utils/figma";
import { pluginFrameSize } from "../dataConfig";
import { handleStorage } from "./handleStorage";
import { handleResize } from "./handleResize";
import { handlePayment } from "./handlePayment";

console.clear();

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

// figma.payments.initiateCheckoutAsync({
//   interstitial: "TRIAL_ENDED",
// });

const trialPeriod = handlePayment();

// ON MESSAGE
figma.ui.onmessage = (msg) => {
  handleStorage(msg);
  handleResize(msg);

  // console.log("payments", figma.payments.status);
  const isSelectionLength = figma.currentPage.selection.length !== 0;

  if (msg.type === "populate") {
    const selection = figma.currentPage.selection;
    const JSONconfig = msg.data as JSONconfigType;
    // console.log("JSONconfig", JSONconfig);

    // Check if something selected
    // POPULATE
    if (!isSelectionLength) {
      figmaNotify("error", `Select something to populate matches`, 3000);
    } else {
      const modifiedData = applyOptions(
        JSONconfig.originalJSON,
        JSONconfig.randomType,
        JSONconfig.range
      );

      JSONconfig.checkedItems.map((selectedItem) => {
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

  ///////////////////////
  // SERVICE FUNCTIONS //
  ///////////////////////

  // IF NO KEY SELECTED
  if (msg.type === "alert") {
    figmaNotify("error", msg.data, 3000);
  }

  if (msg.type === "bind-names") {
    if (isSelectionLength) {
      figma.currentPage.selection.map((selectedItem) => {
        selectedItem.name = msg.layerName;
      });

      figmaNotify("success", `Name ${msg.layerName} is bound`, 3000);
    } else {
      figmaNotify("error", "Select some layers first", 3000);
    }
  }

  ///////////////////////
  // HANDLE TRIAL END //
  ///////////////////////
  trialPeriod.then((trialPeriod) => {
    figma.ui.postMessage({
      type: "trial",
      daysLeft: trialPeriod,
    });
  });
};

figma.currentPage.setRelaunchData({ open: "" });
