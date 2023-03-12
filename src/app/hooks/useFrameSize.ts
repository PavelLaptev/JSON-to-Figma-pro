import React from "react";

export const useFrameSize = (ref: React.RefObject<any>, deps: any) => {
  // Update the frame height when the component is mounted
  React.useEffect(() => {
    const frameHeight = Math.round(ref.current.getBoundingClientRect().height);

    // Send the new frame height to the plugin
    parent.postMessage(
      { pluginMessage: { type: "change-size", frameHeight: frameHeight } },
      "*"
    );
  }, [deps]);
};
