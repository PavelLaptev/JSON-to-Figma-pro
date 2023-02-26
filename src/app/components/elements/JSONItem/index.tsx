import * as React from "react";
import { execCopyToClipboard } from "../../../utils/app";
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
  onChange: (e: onChangeType) => void;
}

const JSONItem: React.FC<Props> = (props) => {
  const [isChecked, setIsChecked] = React.useState(props.checked);

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
        <Checkbox
          className={styles.checkbox}
          label={props.label}
          id={props.id}
          type={props.type}
          checked={isChecked}
          onChange={handleChange}
          indeterminate={props.indeterminate}
        />

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
