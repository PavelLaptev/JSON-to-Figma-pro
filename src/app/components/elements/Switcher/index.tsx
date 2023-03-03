import React, { useState } from "react";

import styles from "./styles.module.scss";

interface Props {
  label?: string;
  checked?: boolean;
  id: string;
  onChange?: (checked: boolean) => void;
}

const Switcher: React.FC<Props> = (props) => {
  const [switcherChecked, setSwitcherChecked] = useState(props.checked);

  const handleChange = (e) => {
    setSwitcherChecked(!switcherChecked);

    props.onChange(e.target.checked);
  };

  React.useEffect(() => {
    setSwitcherChecked(props.checked);
  }, [props.checked]);

  return (
    <div className={styles.wrap}>
      <input
        type="checkbox"
        id={props.id}
        checked={switcherChecked}
        onChange={handleChange}
      />
      <label htmlFor={props.id}>{props.label}</label>
    </div>
  );
};

Switcher.defaultProps = {
  label: "label",
  checked: false,
} as Partial<Props>;

export default Switcher;
