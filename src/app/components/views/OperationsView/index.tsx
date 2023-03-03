import * as React from "react";

import {
  JSONActions,
  SkipLayers,
  RandomSwitcher,
  SelectRange,
} from "./sections";
import { JSONGroup, JSONItem, Resizer } from "../../elements";
import {
  findObjItem,
  updateGroupState,
  getAllChecked,
} from "../../../utils/app";
import { useFrameSize } from "../../../hooks";

import styles from "./styles.module.scss";

interface Props {
  configData: configDataType;
  onRejectClick(): void;
}

const OperationsView: React.FunctionComponent<Props> = (props) => {
  const mainSectionRef = React.useRef<HTMLDivElement>(null);

  // console.log(props.configData);

  const [configData, setConfigData] = React.useState(props.configData);

  useFrameSize(mainSectionRef, configData.states);

  const handleItemChange = (e: onChangeType) => {
    const { id, checked } = e;

    // deep copy
    const newState = JSON.parse(JSON.stringify(configData.states));

    // find the item
    const item = findObjItem(newState, id) as JSONItemType;

    // update the item
    item.checked = checked;

    // update the parent group
    updateGroupState(newState, item.parentId);

    // update the state
    setConfigData({
      ...configData,
      states: newState,
      checkedItems: getAllChecked(newState),
    });

    // console.log(parentGroup);
  };

  const handleGroupChange = (e: onChangeType) => {
    const { id, checked } = e;

    // deep copy
    const newState = JSON.parse(JSON.stringify(configData.states));
    // find the item
    const item = findObjItem(newState, id);
    // const parentGroup = findObjItem(newState, item.parentId) as JSONItemType;

    // update the item
    item.checked = checked;
    item.indeterminate = false;

    Object.values(item.children).map((child: any) => {
      child.checked = checked;
      return child;
    });

    // check all children
    const checkAllChildren = (children: any) => {
      Object.values(children).map((child: any) => {
        updateGroupState(newState, item.parentId);
        child.checked = checked;

        if (child.type === "group") {
          child.indeterminate = false;
          checkAllChildren(child.children);
        }
        return child;
      });
    };

    checkAllChildren(item.children);

    // update the state
    setConfigData({
      ...configData,
      states: newState,
      checkedItems: getAllChecked(newState),
    });

    // console.log(JSONNodes);
  };

  const handleExpandGroup = (e: onExpandType) => {
    const { id, expanded } = e;

    // deep copy
    const newState = JSON.parse(JSON.stringify(configData.states));
    // find the item
    const item = findObjItem(newState, id);

    // update the item
    item.expanded = expanded;

    // update the state
    setConfigData({
      ...configData,
      states: newState,
    });
  };

  const handleRandomSwitch = (value: RandomValueTypes) => {
    setConfigData({
      ...configData,
      randomType: value,
    });

    // console.log(props.configData.originalJSON);
  };

  const handleRangeChange = (range: { from: number; to: number }) => {
    // console.log(range);

    setConfigData({
      ...configData,
      range: range,
    });
  };

  const handlePopulateClick = () => {
    // check if there is any selected item
    if (configData.checkedItems.length === 0) {
      parent.postMessage(
        {
          pluginMessage: {
            type: "alert",
            data: "Please select at least one item",
          },
        },
        "*"
      );
      return;
    }

    parent.postMessage(
      {
        pluginMessage: {
          type: "populate",
          data: configData,
        },
      },
      "*"
    );
  };

  //////////////////////////
  ////// USE EFFECT ////////
  //////////////////////////
  React.useEffect(() => {
    // console.log("configData", configData);

    parent.postMessage(
      {
        pluginMessage: {
          type: "set-json-settings-storage",
          data: configData as configDataType,
        },
      },
      "*"
    );
  }, [configData]);

  //////////////////////////
  ////// RENDER ////////////
  //////////////////////////
  const createNestedJSON = (json: any) => {
    const values = Object.values(json);

    return values.map((value: any, index) => {
      // console.log(value);
      if (value.children) {
        return (
          <JSONGroup
            label={value.keyName}
            id={value.id}
            key={index}
            checked={value.checked}
            expanded={value.expanded}
            indeterminate={value.indeterminate}
            onChange={handleGroupChange}
            onExpand={handleExpandGroup}
          >
            {createNestedJSON(value.children)}
          </JSONGroup>
        );
      } else {
        return (
          <JSONItem
            label={value.keyName}
            id={value.id}
            key={index}
            checked={value.checked}
            isImage={value.isImage}
            onChange={handleItemChange}
          />
        );
      }
    });
  };

  return (
    <main className={styles.wrap} ref={mainSectionRef}>
      <Resizer />

      <section className={styles.head}>
        <div className={styles.list}>{createNestedJSON(configData.states)}</div>

        <JSONActions
          onRejectClick={props.onRejectClick}
          onPopulateClick={handlePopulateClick}
          selectedCount={configData.checkedItems.length}
        />
      </section>

      <RandomSwitcher
        onChange={handleRandomSwitch}
        defaultActiveTab={configData.randomType}
      />
      <SelectRange
        max={props.configData.originalJSON.length}
        onChange={(val) => {
          handleRangeChange(val);
        }}
        value={`${configData.range.from}-${configData.range.to}`}
      />
      <SkipLayers />
    </main>
  );
};

export default OperationsView;
