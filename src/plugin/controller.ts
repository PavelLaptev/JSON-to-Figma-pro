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
  // console.log("applyOptions", obj, randomType, range);

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
      figmaNotify(`🚨 Select something to populate matches`, 3000);
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
    const selectionLength = figma.currentPage.selection.length;
    const target = figma.currentPage.findOne((n) => n.id === msg.targetID);
    const imageHash = figma.createImage(msg.data).hash;

    console.log(target["fills"]);

    const firstFill = target["fills"][0];

    const newFill = {
      type: "IMAGE",
      blendMode: firstFill.blendMode ? firstFill.blendMode : "NORMAL",
      filters: firstFill.filters ? firstFill.filters : {},
      scaleMode: firstFill.scaleMode ? firstFill.scaleMode : "FILL",
      scalingFactor: firstFill.scalingFactor ? firstFill.scalingFactor : 1,
      rotation: firstFill.rotation ? firstFill.rotation : 0,
      opacity: firstFill.opacity ? firstFill.opacity : 1,
      imageHash: imageHash,
    };
    target["fills"] = [newFill];

    // show notification if all images are fetched
    if (msg.index === selectionLength - 1) {
      figmaNotify("🎉 Images fetched!", 3000);
    }
  }

  ///////////////////////
  // SERVICE FUNCTIONS //
  ///////////////////////

  if (msg.type === "bind-names") {
    if (isSelectionLength) {
      figma.currentPage.selection.map((selectedItem) => {
        selectedItem.name = msg.layerName;
      });

      figmaNotify(`✅ Name ${msg.layerName} is bound`, 3000);
    } else {
      figmaNotify("🚨 Select some layers first", 3000);
    }
  }

  ///////////////////////
  // HANDLE PAYMENT /////
  ///////////////////////

  if (msg.type === "initiate-checkout") {
    console.log("initiate-checkout");
    figma.payments.initiateCheckoutAsync({
      interstitial: "SKIP",
    });
  }

  if (msg.type === "get-trial") {
    handlePayment(msg).then((daysLeft) => {
      // console.log("daysLeft", daysLeft);
      figma.ui.postMessage({
        type: "trial",
        daysLeft: daysLeft,
      });
    });
  }

  ///////////////////////
  // MESSAGE FROM UI ////
  ///////////////////////
  if (msg.type === "showMsg") {
    figmaNotify(msg.text, 3000);
  }
};

figma.currentPage.setRelaunchData({ open: "" });
