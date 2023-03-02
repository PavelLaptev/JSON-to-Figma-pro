import * as React from "react";
import styles from "./styles.module.scss";

interface Props {
  value?: string;
  onChange?(event: React.FormEvent<HTMLInputElement>): void;
  className?: string;
  type?: "text" | "number";
  pattern?: string;
  min?: number;
  max?: number;
}

const Input: React.FC<Props> = (props) => {
  return (
    <input
      onLoad={() => console.log("loaded")}
      className={`${styles.input} ${props.className}`}
      onChange={props.onChange}
      value={props.value}
      type={props.type}
      pattern={props.pattern}
      min={props.min}
      max={props.max}
    />
  );
};

Input.defaultProps = {
  value: "",
  onChange: () => {},
  className: "",
} as Partial<Props>;

export default Input;
