import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  value?: string;
  onChange?(event: React.FormEvent<HTMLInputElement>): void;
  className?: string;
}

const Input: React.FC<Props> = (props) => {
  return (
    <input
      onLoad={() => console.log("loaded")}
      className={`${styles.input} ${props.className}`}
      onChange={props.onChange}
      value={props.value}
    />
  );
};

Input.defaultProps = {
  value: "",
  onChange: () => {},
  className: "",
} as Partial<Props>;

export default Input;
