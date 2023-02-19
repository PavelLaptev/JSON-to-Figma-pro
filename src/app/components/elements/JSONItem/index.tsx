import * as React from "react";
import { execCopyToClipboard } from "../../../utils/app";
import Icon from "../Icon";

import styles from "./styles.module.scss";

interface Props {
  className?: string;
  type?: "group" | "item";
  label: string;
  id: string;
  checked: boolean;
  indeterminate?: boolean;
  isImage?: boolean;
  onChange: (e: onChangeType) => void;
}

const JSONItem: React.FC<Props> = (props) => {
  const checkboxRef = React.useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = React.useState(props.checked);

  React.useEffect(() => {
    setIsChecked(props.checked);
  }, [props.checked]);

  React.useEffect(() => {
    if (checkboxRef.current && props.type === "group") {
      // console.log("indeterminate", props.indeterminate);
      checkboxRef.current.indeterminate = props.indeterminate;
    }
  }, [props.indeterminate]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);

    if (props.onChange) {
      props.onChange({
        id: props.id,
        checked: event.target.checked,
      });
    }
  };

  const handleNameClick = () => {
    if (props.type === "item") {
      // copy id to clipboard
      execCopyToClipboard(props.id);
      parent.postMessage(
        {
          pluginMessage: {
            type: "copy",
            text: `layer name "${props.id}" copied`,
          },
        },
        "*"
      );
    }
  };

  return (
    <section className={styles.row}>
      <div className={styles.item}>
        <input
          ref={checkboxRef}
          id={props.id}
          type="checkbox"
          className={styles.checkbox}
          checked={isChecked}
          onChange={handleChange}
        />
        <label
          htmlFor={props.id}
          className={styles.label}
          data-id={props.id}
          data-type={props.type}
        >
          {props.label}
        </label>
        {props.isImage && <Icon name="image" />}
      </div>
      {props.type === "item" && (
        <div
          className={styles.labelTag}
          title="Copy full name"
          onClick={handleNameClick}
        >
          <Icon name="copy" />
        </div>
      )}
    </section>
  );
};

JSONItem.defaultProps = {
  className: "",
  type: "item",
  isImage: false,
} as Partial<Props>;

export default JSONItem;
