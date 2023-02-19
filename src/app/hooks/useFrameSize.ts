import React from "react";

export const useFrameSize = (ref: React.RefObject<any>, deps: any) => {
  // Update the frame height when the component is mounted
  React.useEffect(() => {
    const frameHeight = ref.current.getBoundingClientRect().height + 10;

    parent.postMessage(
      { pluginMessage: { type: "change-size", frameHeight } },
      "*"
    );
  }, [deps]);
};
