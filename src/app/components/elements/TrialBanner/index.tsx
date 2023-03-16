import * as React from "react";
import lockTop from "./../../../assets/lock-top.svg";
import styles from "./styles.module.scss";

interface Props {
  className?: any;
  daysLeft: number;
}

const TrialBanner: React.FC<Props> = (props) => {
  const handleClick = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "initiate-checkout",
        },
      },
      "*"
    );
  };

  return (
    <div className={`${styles.wrap} ${props.className}`} onClick={handleClick}>
      <div className={styles.content}>
        <h3 className={styles.title}>
          Your trial will expire in <span>{props.daysLeft} days</span>
        </h3>
        <span className={styles.text}>Unlock your full potential now!</span>
      </div>

      <div className={styles.lock}>
        <img className={styles.lockTop} src={lockTop} alt="" />
        <div className={styles.lockBottom} />
      </div>
    </div>
  );
};

TrialBanner.defaultProps = {
  className: "",
};

export default TrialBanner;
