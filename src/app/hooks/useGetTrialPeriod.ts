import React from "react";

export const useGetTrialPeriod = () => {
  const [daysLeft, setDaysLeft] = React.useState(0);

  const handleTrial = (event) => {
    const message = event.data.pluginMessage;
    // console.log("message", message);

    if (message.type === "trial" && message.daysLeft > 0) {
      console.log("trial days left", message.daysLeft);
      setDaysLeft(message.daysLeft);

      parent.postMessage(
        {
          pluginMessage: {
            type: "initial-size",
            isTrial: true,
          },
        },
        "*"
      );
    }
  };

  React.useEffect(() => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "get-trial",
        },
      },
      "*"
    );

    // listen for messages from the plugin controller
    window.addEventListener("message", handleTrial);

    return () => {
      window.removeEventListener("message", handleTrial);
    };
  }, []);

  return daysLeft;
};
