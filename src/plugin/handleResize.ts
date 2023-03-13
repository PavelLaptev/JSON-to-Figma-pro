import { pluginFrameSize } from "../dataConfig";

export const handleResize = (msg: any) => {
  // CHANGE SIZE
  const zoomRatio = figma.viewport.zoom;
  const maximumPluginHeight =
    Math.round(figma.viewport.bounds.height * zoomRatio) - 140;
  // console.log("maximumPluginHeight and zoom", maximumPluginHeight, zoomRatio);

  if (msg.type === "initial-size") {
    figma.ui.resize(pluginFrameSize.width, pluginFrameSize.height);
  }

  if (msg.type === "change-size") {
    // console.log("max height", maximumPluginHeight);
    if (msg.frameHeight > maximumPluginHeight) {
      figma.ui.resize(pluginFrameSize.width, maximumPluginHeight);
    } else {
      figma.ui.resize(pluginFrameSize.width, Math.round(msg.frameHeight));
    }
  }
};
