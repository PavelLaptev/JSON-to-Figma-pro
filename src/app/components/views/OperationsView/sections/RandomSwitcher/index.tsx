import * as React from "react";

import { SectionWrapper, Tabs } from "../../../../elements";

interface Props {
  onChange: (value: RandomValueTypes) => void;
  defaultActiveTab?: RandomValueTypes;
}

const tabs = [
  {
    label: "None",
    value: "none",
  },
  {
    label: "Normal",
    value: "normal",
  },
  {
    label: "Chaotic",
    value: "chaotic",
  },
];

const RandomSwitcher: React.FC<Props> = (props) => {
  return (
    <SectionWrapper divider title="Random order">
      <Tabs
        items={tabs}
        defaultActiveTab={props.defaultActiveTab}
        onChange={props.onChange}
      />
    </SectionWrapper>
  );
};

export default RandomSwitcher;
