import * as React from "react";
// import Icon from "../Icon";
import styles from "./styles.module.scss";

interface Props {
  className?: any;
}

const TrialBanner: React.FC<Props> = (props) => {
  const [daysLeft, setDaysLeft] = React.useState(0);

  React.useEffect(() => {
    // listen for messages from the plugin controller
    window.onmessage = (event) => {
      const message = event.data.pluginMessage;

      if (message.type === "trial" && message.daysLeft > 0) {
        // console.log("trial", message.daysLeft);
        setDaysLeft(message.daysLeft);
      }
    };
  }, []);

  return (
    daysLeft > 0 && (
      <div className={`${styles.wrap} ${props.className}`}>
        <h3>{`Trial version. ${daysLeft} days left.`}</h3>
      </div>
    )
  );
};

TrialBanner.defaultProps = {
  className: "",
};

export default TrialBanner;
