import * as React from "react";

import { Button } from "../../../../elements";

import styles from "./styles.module.scss";

interface Props {
  // obj: Object;
  // random: boolean;
  // range: string;
  // onReuploadClick(event: React.MouseEvent<HTMLButtonElement>): void;
  selectedCount: number;
  onRejectClick(): void;
  onPopulateClick(): void;
}

const JSONActions: React.FC<Props> = (props) => {
  // INITIAL CONSTANTS

  // RENDER
  return (
    <section className={styles.wrap}>
      <Button
        className={styles.button}
        text={"Populate selected"}
        mod="PRIMARY"
        count={props.selectedCount}
        onClick={props.onPopulateClick}
      />
      <Button
        className={styles.icon}
        icon="bin"
        title="Reupload"
        mod="PRIMARY"
        onClick={() => {
          props.onRejectClick();

          parent.postMessage(
            { pluginMessage: { type: "clear-json-settings-storage" } },
            "*"
          );
        }}
      />
    </section>
  );
};

export default JSONActions;
