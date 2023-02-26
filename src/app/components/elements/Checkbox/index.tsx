import * as React from "react";
import Icon from "../Icon";

import styles from "./styles.module.scss";

interface Props {
  className?: string;
  label: string;
  id: string;
  type?: "group" | "item";
  checked: boolean;
  indeterminate?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<Props> = (props) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isChecked, setIsChecked] = React.useState(props.checked);

  React.useEffect(() => {
    if (inputRef.current && props.type === "group") {
      // console.log("indeterminate", props.indeterminate);
      inputRef.current.indeterminate = props.indeterminate;
    }
  }, [props.indeterminate]);

  React.useEffect(() => {
    setIsChecked(props.checked);
  }, [props.checked]);

  return (
    <div
      className={`${styles.wrap} ${props.className} ${
        isChecked
          ? styles.checkedWrap
          : props.indeterminate
          ? styles.indeterminatedWrap
          : ""
      }`}
    >
      <div
        className={`${styles.checkbox} ${
          isChecked || props.indeterminate ? styles.checked : ""
        }`}
      >
        {isChecked || props.indeterminate ? (
          <Icon
            name={props.indeterminate ? "partial-checkbox" : "tick-checkbox"}
            className={styles.icon}
          />
        ) : null}
        <input
          ref={inputRef}
          id={props.id}
          type="checkbox"
          checked={isChecked}
          onChange={props.onChange}
        />
      </div>

      <label
        htmlFor={props.id}
        className={styles.label}
        data-id={props.id}
        data-type={props.type}
      >
        {props.label}
      </label>
    </div>
  );
};

Checkbox.defaultProps = {
  className: "",
} as Partial<Props>;

export default Checkbox;
