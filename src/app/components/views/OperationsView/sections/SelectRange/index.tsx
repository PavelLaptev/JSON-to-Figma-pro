import * as React from "react";

import { ElementCaption, Input, SectionWrapper } from "../../../../elements";
import styles from "./styles.module.scss";

interface Props {
  onChange(value: { from: number; to: number }): void;
  value: string;
  max: number;
}

const isRangeValid = (range: string, maxVal: number) => {
  // if range mathces the following format: "from-to"
  // where from and to are numbers
  const rangeRegex = new RegExp(`^\\d+-\\d+$`);
  const rangeMatch = range.match(rangeRegex);

  if (rangeMatch) {
    const [from, to] = range.split("-").map((num) => parseInt(num, 10));
    // console.log(from, to, maxVal);

    return from < to && to <= maxVal && from > 0;
  }

  return false;
};

const SelectRange: React.FC<Props> = (props) => {
  const [val, setVal] = React.useState(props.value);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setVal(value);

    if (isRangeValid(value, props.max || 0)) {
      props.onChange({
        from: parseInt(value.split("-")[0], 10),
        to: parseInt(value.split("-")[1], 10),
      });
    }
  };

  return (
    <SectionWrapper
      className={styles.wrap}
      divider
      title="Restrict range"
      LabelTag={`max ${props.max}`}
    >
      <ElementCaption
        text={`Filter the JSON data and populate only the selected range. Use the following format: "from-to".`}
      >
        <div className={styles.inputWrap}>
          <Input
            className={`${
              !isRangeValid(val, props.max) ? styles.inputError : ""
            } ${styles.input}`}
            value={val}
            onChange={handleChange}
          />
          {!isRangeValid(val, props.max) ? (
            <span className={styles.errorCaption}>Invalid range format</span>
          ) : null}
        </div>
      </ElementCaption>
    </SectionWrapper>
  );
};

SelectRange.defaultProps = {
  value: "",
  error: false,
} as Partial<Props>;

export default SelectRange;
