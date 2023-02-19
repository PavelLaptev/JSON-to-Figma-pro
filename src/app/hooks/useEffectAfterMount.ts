import React from "react";

export const useEffectAfterMount = (foo, dependencies) => {
  const mounted = React.useRef(true);

  React.useEffect(() => {
    if (!mounted.current) {
      return foo();
    }
    mounted.current = false;
  }, dependencies);
};
