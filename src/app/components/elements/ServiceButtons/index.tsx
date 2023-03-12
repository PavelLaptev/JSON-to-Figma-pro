import * as React from "react";

import styles from "./styles.module.scss";

interface Props {
  onSettingsClick: () => void;
}

const ServiceButtons: React.FC<Props> = (props) => {
  return (
    <div className={styles.wrap}>
      <button
        className={styles.button}
        onClick={() => {
          // open documentation in new tab
          window.open(
            "https://pavellaptev.notion.site/JSON-to-Figma-e4f79e250b54413ba5797c1d4a806070",
            "_blank"
          );
        }}
      >
        <span>Documentation</span>
      </button>
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
