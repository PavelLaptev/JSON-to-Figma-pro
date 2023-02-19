import * as React from "react";
import "../styles/ui.scss";

import {
  showMsg,
  execGetClipboard,
  clearNullValues,
  fetchFromURL,
  flatObjects,
  convertObjectArraysToObjects,
  convertObjectToStates,
  fetchImagefromURL,
} from "../utils/app";
import { LaunchView, OperationsView } from "./views";

console.clear();

const App = () => {
  const [configData, setConfigData] = React.useState(null) as [
    configDataType,
    any
  ];

  const [storageStatus, setStorageStatus] = React.useState("loading") as [
    any,
    any
  ];

  // Helper function
  const showErrorMsg = (error, errorText) => {
    console.error(error);
    showMsg("error", errorText);
  };

  const handleJSON = (obj: object) => {
    const clearedFromNull = clearNullValues(obj);
    const convertedArraysJSON = convertObjectArraysToObjects(clearedFromNull);
    const flattenedJSON = flatObjects(convertedArraysJSON);

    console.log(flattenedJSON);

    const convertedToStates = {
      rootJSONItems: {
        type: "group",
        id: "rootJSONItems",
        keyName: "JSON",
        checked: false,
        parentId: null,
        expanded: true,
        indeterminate: false,
        children: convertObjectToStates(convertedArraysJSON[0]),
      } as JSONItemType,
    };

    setConfigData({
      states: convertedToStates,
      originalJSON: flattenedJSON,
      range: {
        from: 1,
        to: clearedFromNull.length,
      },
      randomType: "none",
      checkedItems: [],
    });
  };

  // Handle file input type
  const handleUploadLocalFile = (e) => {
    let fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0]);

    fileReader.onload = () => {
      try {
        let obj = JSON.parse(fileReader.result as string);

        handleJSON(obj);
      } catch (error) {
        showErrorMsg(
          error,
          "Something wrong with the file. Check the structure"
        );
      }
    };
    e.target.value = "";
  };

  // Handle copy from Clipboard
  const fetchUrlLink = async () => {
    let clipboardLink = execGetClipboard();

    try {
      let response = await fetchFromURL(clipboardLink);
      let responseJson = await response.json();

      handleJSON(responseJson);
    } catch (error) {
      showErrorMsg(error, "Something wrong with the URL. Check the structure");
    }
  };

  const onRejectClick = () => {
    parent.postMessage({ pluginMessage: { type: "initial-size" } }, "*");

    setConfigData(null);
  };

  //////////////////////////
  // USE EFFECTS ///////////
  //////////////////////////

  React.useEffect(() => {
    parent.postMessage({ pluginMessage: { type: "get-storage" } }, "*");

    window.onmessage = (event) => {
      const message = event.data.pluginMessage;

      // console.log("get it", event.data);
      // get storage
      if (message.type === "get-storage") {
        if (message.data) {
          setConfigData(message.data);
        }

        setStorageStatus("empty");
      }

      // if image detected
      if (message.type === "image-url") {
        // console.log(imgURL);
        fetchImagefromURL(message.url, message.targetID);
      }
    };
  }, []);

  //////////////////////////
  // RENDER ////////////////
  //////////////////////////

  const handleUIState = () => {
    // console.log(storageStatus, statesJSON);

    if (storageStatus === "loading" && !configData) {
      return <h1>Storage is loading...</h1>;
    }

    if (storageStatus === "empty" && !configData) {
      return (
        <LaunchView
          urlOnClick={fetchUrlLink}
          fileOnChange={handleUploadLocalFile}
        />
      );
    }

    if (configData) {
      return (
        <OperationsView configData={configData} onRejectClick={onRejectClick} />
      );
    }
  };

  return handleUIState();
};

export default App;
