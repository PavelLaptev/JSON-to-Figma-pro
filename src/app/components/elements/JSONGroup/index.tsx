import * as React from "react";
import JSONItem from "../JSONItem";

import styles from "./styles.module.scss";

interface Props {
  className?: string;
  label: string;
  id: string;
  checked: boolean;
  expanded: boolean;
  indeterminate: boolean;
  children: React.ReactNode;
  onChange: (e: onChangeType) => void;
  onExpand: (e: onExpandType) => void;
}

const JSONGroup: React.FC<Props> = (props) => {
  const [isExpanded, setIsExpanded] = React.useState(props.expanded);

  const handleExpand = () => {
    setIsExpanded(!isExpanded);

    if (props.onExpand) {
      props.onExpand({
        id: props.id,
        expanded: !isExpanded,
      });
    }
  };

  return (
    <section className={styles.group}>
      <div className={styles.label}>
        <button onClick={handleExpand}>{isExpanded ? "˅" : ">"}</button>
        <JSONItem
          label={props.label}
          id={props.id}
          type="group"
          checked={props.checked}
          indeterminate={props.indeterminate}
          onChange={props.onChange}
        />
      </div>

      {props.children ? (
        <div className={`${styles.group} ${!isExpanded ? styles.hide : ""}`}>
          {props.children}
        </div>
      ) : null}
    </section>
  );
};

JSONGroup.defaultProps = {
  className: "",
} as Partial<Props>;

export default JSONGroup;
