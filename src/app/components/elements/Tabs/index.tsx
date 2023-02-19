import React, { useState } from "react";

import styles from "./styles.module.scss";

interface Props {
  className?: string;
  items: Array<{
    label: string;
    value: string;
  }>;
  defaultActiveTab?: string;
  onChange: (value: string) => void;
}

const Tabs: React.FC<Props> = (props) => {
  const [activeTab, setActiveTab] = useState(() => {
    const index = props.items.findIndex(
      (item) => item.value === props.defaultActiveTab
    );
    return index > -1 ? index : 0;
  });

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    props.onChange(props.items[index].value);
  };

  return (
    <div className={`${styles.tabs} ${props.className}`}>
      {props.items.map((item, index) => (
        <div
          key={item.value}
          className={`${styles.item} ${
            activeTab === index ? styles.active : ""
          }`}
          onClick={() => handleTabClick(index)}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

Tabs.defaultProps = {
  className: "",
} as Partial<Props>;

export default Tabs;
