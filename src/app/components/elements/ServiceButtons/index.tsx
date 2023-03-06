import * as React from "react";

import styles from "./styles.module.scss";

interface Props {
  onSettingsClick: () => void;
}

const ServiceButtons: React.FC<Props> = (props) => {
  return (
    <div className={styles.wrap}>
      <a
        href="
        #"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
      >
        <span>Documentation</span>
      </a>
      <button
        onClick={() => {
          console.log("Settings");

          if (props.onSettingsClick) {
            props.onSettingsClick();
          }
        }}
        className={styles.button}
      >
        <span>Settings</span>
      </button>
    </div>
  );
};

export default ServiceButtons;
