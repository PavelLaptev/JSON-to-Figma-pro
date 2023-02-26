import * as React from "react";
// import Icon from "../Icon";
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
        <button className={styles.expandButton} onClick={handleExpand}>
          <svg
            className={styles.expandIcon}
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: isExpanded ? "rotate(90deg)" : "rotate(0deg)",
            }}
          >
            <path d="M7.41326 3.563C7.75616 3.75351 7.75616 4.24666 7.41326 4.43716L1.74282 7.5874C1.40956 7.77255 1 7.53157 1 7.15033L1 0.84984C1 0.468598 1.40956 0.227614 1.74282 0.412762L7.41326 3.563Z" />
          </svg>
        </button>
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
        <div className={`${styles.children} ${!isExpanded ? styles.hide : ""}`}>
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
