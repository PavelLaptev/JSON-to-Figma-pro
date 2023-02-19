import * as React from "react";

import styles from "./styles.module.scss";

interface Props {
  className?: string;
  label: string;
  mode?: "primary" | "secondary";
}

const LabelTag: React.FC<Props> = (props) => {
  return (
    <div className={`${styles.wrap} ${styles[props.mode]} ${props.className}`}>
      <span className={styles.label}>{props.label}</span>
    </div>
  );
};

LabelTag.defaultProps = {
  className: "",
  mode: "primary",
} as Partial<Props>;

export default LabelTag;
