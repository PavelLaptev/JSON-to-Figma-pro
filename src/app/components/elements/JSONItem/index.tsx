import * as React from "react";
import Icon from "../Icon";
import Checkbox from "../Checkbox";

import styles from "./styles.module.scss";

interface Props {
  className?: string;
  type?: "group" | "item";
  label: string;
  id: string;
  checked: boolean;
  indeterminate?: boolean;
  isImage?: boolean;
  isExpanded?: boolean;
  isGroup?: boolean;
  handleExpand?: () => void;
  onChange: (e: onChangeType) => void;
}

const JSONItem: React.FC<Props> = (props) => {
  const [isChecked, setIsChecked] = React.useState(props.checked);
  const [boundName, setBoundName] = React.useState(false);

  React.useEffect(() => {
    setIsChecked(props.checked);
  }, [props.checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);

    if (props.onChange) {
      props.onChange({
        id: props.id,
        checked: event.target.checked,
      });
    }
  };

  const handleBindNames = () => {
    setBoundName(true);

    parent.postMessage(
      {
        pluginMessage: {
          type: "bind-names",
          layerName: props.id,
        },
      },
      "*"
    );
  };

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setBoundName(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [boundName]);

  return (
    <section className={styles.row}>
      {props.isGroup ? (
        <button className={styles.expandButton} onClick={props.handleExpand}>
          <svg
            className={styles.expandIcon}
            viewBox="0 0 8 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              transform: props.isExpanded ? "rotate(90deg)" : "rotate(0deg)",
            }}
          >
            <path d="M7.41326 3.563C7.75616 3.75351 7.75616 4.24666 7.41326 4.43716L1.74282 7.5874C1.40956 7.77255 1 7.53157 1 7.15033L1 0.84984C1 0.468598 1.40956 0.227614 1.74282 0.412762L7.41326 3.563Z" />
          </svg>
        </button>
      ) : (
        <div className={styles.itemPointer} />
      )}
      <div className={styles.item}>
        <Checkbox
          className={`${styles.checkbox} ${
            boundName && !isChecked ? styles.copied : ""
          }
          ${isChecked && boundName ? styles.copiedChecked : ""}
          `}
          label={props.id === "rootJSONItems" ? "ROOT" : props.label}
          id={props.id}
          type={props.type}
          isImage={props.isImage}
          checked={isChecked}
          onChange={handleChange}
          indeterminate={props.indeterminate}
        />
      </div>
      {props.type === "item" && isChecked ? (
        <div
          className={styles.labelTag}
          title="Bind names with layer"
          onClick={handleBindNames}
        >
          <Icon name="copy" color="var(--clr-main)" />
        </div>
      ) : null}
    </section>
  );
};

JSONItem.defaultProps = {
  className: "",
  type: "item",
  isImage: false,
  isGroup: false,
} as Partial<Props>;

export default JSONItem;
