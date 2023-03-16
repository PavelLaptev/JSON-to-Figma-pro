import * as React from "react";

import {
  JSONActions,
  SkipLayers,
  RandomSwitcher,
  SelectRange,
} from "./sections";
import { JSONGroup, JSONItem } from "../../elements";
import {
  findObjItem,
  updateGroupState,
  getAllChecked,
  showFigmaMsg,
} from "../../../../utils/app";
import { useFrameSize } from "../../../hooks";

import styles from "./styles.module.scss";

interface Props {
  JSONconfig: JSONconfigType;
  appConfig: appConfigType;
  onRejectClick(): void;
}

const OperationsView: React.FunctionComponent<Props> = (props) => {
  const mainSectionRef = React.useRef<HTMLDivElement>(null);

  // console.log(props.appConfig);

  const [JSONconfig, setJSONconfig] = React.useState(props.JSONconfig);

  useFrameSize(mainSectionRef, JSONconfig.states);

  const handleItemChange = (e: onChangeType) => {
    const { id, checked } = e;

    // deep copy
    const newState = JSON.parse(JSON.stringify(JSONconfig.states));

    // find the item
    const item = findObjItem(newState, id) as JSONItemType;

    // update the item
    item.checked = checked;

    // update the parent group
    updateGroupState(newState, item.parentId);

    // update the state
    setJSONconfig({
      ...JSONconfig,
      states: newState,
      checkedItems: getAllChecked(newState),
    });

    // console.log(parentGroup);
  };

  const handleGroupChange = (e: onChangeType) => {
    const { id, checked } = e;

    // deep copy
    const newState = JSON.parse(JSON.stringify(JSONconfig.states));
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
    setJSONconfig({
      ...JSONconfig,
      states: newState,
      checkedItems: getAllChecked(newState),
    });

    // console.log(JSONNodes);
  };

  const handleExpandGroup = (e: onExpandType) => {
    const { id, expanded } = e;

    // deep copy
    const newState = JSON.parse(JSON.stringify(JSONconfig.states));
    // find the item
    const item = findObjItem(newState, id);

    // update the item
    item.expanded = expanded;

    // update the state
    setJSONconfig({
      ...JSONconfig,
      states: newState,
    });
  };

  const handleRandomSwitch = (value: RandomValueTypes) => {
    setJSONconfig({
      ...JSONconfig,
      randomType: value,
    });
  };

  const handleRangeChange = (range: { from: number; to: number }) => {
    // console.log(range);

    setJSONconfig({
      ...JSONconfig,
      range: range,
    });
  };

  const handlePopulateClick = () => {
    // check if there is any selected item
    if (JSONconfig.checkedItems.length === 0) {
      showFigmaMsg("🚨 Please select at least one item");
      return;
    }

    parent.postMessage(
      {
        pluginMessage: {
          type: "populate",
          data: JSONconfig,
        },
      },
      "*"
    );
  };

  //////////////////////////
  ////// USE EFFECT ////////
  //////////////////////////
  React.useEffect(() => {
    // console.log("JSONconfig", JSONconfig);

    parent.postMessage(
      {
        pluginMessage: {
          type: "set-json-settings-storage",
          data: JSONconfig as JSONconfigType,
        },
      },
      "*"
    );
  }, [JSONconfig]);

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
            label={props.appConfig.showShortKeyNames ? value.keyName : value.id}
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
      <section className={styles.head}>
        <div className={styles.list}>{createNestedJSON(JSONconfig.states)}</div>

        <JSONActions
          onRejectClick={props.onRejectClick}
          onPopulateClick={handlePopulateClick}
          selectedCount={JSONconfig.checkedItems.length}
        />
      </section>

      <RandomSwitcher
        onChange={handleRandomSwitch}
        defaultActiveTab={JSONconfig.randomType}
      />
      <SelectRange
        max={props.JSONconfig.originalJSON.length}
        onChange={(val) => {
          handleRangeChange(val);
        }}
        value={`${JSONconfig.range.from}-${JSONconfig.range.to}`}
      />
      <SkipLayers />
    </main>
  );
};

export default OperationsView;
