import * as React from "react";
import "../styles/ui.scss";

import {
  showFigmaMsg,
  execGetClipboard,
  clearNullValues,
  fetchFromURL,
  flatObjects,
  convertObjectArraysToObjects,
  convertObjectToStates,
  fetchImagefromURL,
} from "../../utils/app";
import { LaunchView, OperationsView, SettingsView, LoadingView } from "./views";
import { useEffectAfterMount, useGetTrialPeriod } from "../hooks";

const App = () => {
  const [showAppSettings, setShowAppSettings] = React.useState(false);
  const [appConfig, setAppConfig] = React.useState({
    showShortKeyNames: false,
    darkMode: false,
    svgScale: 2,
    proxy: "https://corsproxy.io/?",
  } as appConfigType);

  const [JSONconfig, setJSONConfig] = React.useState(null) as [
    JSONconfigType,
    any
  ];

  const [storageStatus, setStorageStatus] = React.useState("loading") as any;

  const daysLeft = useGetTrialPeriod();

  const handleJSON = (obj: object) => {
    const clearedFromNull = clearNullValues(obj);
    const convertedArraysJSON = convertObjectArraysToObjects(clearedFromNull);
    const flattenedJSON = flatObjects(convertedArraysJSON);

    // console.log(flattenedJSON);

    const convertedToStates = {
      rootJSONItems: {
        type: "group",
        id: "rootJSONItems",
        keyName: "JSON",
        checked: false,
        parentId: null,
        expanded: true,
        indeterminate: false,
        children: convertObjectToStates(convertedArraysJSON[0], ""),
      } as JSONItemType,
    };

    setJSONConfig({
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
        console.error(error);
        showFigmaMsg("🚨 Something wrong with the file. Check the structure");
      }
    };
    e.target.value = "";
  };

  // Handle copy from Clipboard
  const fetchUrlLink = async () => {
    let clipboardLink = execGetClipboard();

    let response = await fetchFromURL(clipboardLink, appConfig.proxy);

    handleJSON(response);
  };

  const onRejectClick = () => {
    parent.postMessage(
      { pluginMessage: { type: "initial-size", isTrial: daysLeft > 0 } },
      "*"
    );
    setJSONConfig(null);
  };

  const handleOnMessage = (event) => {
    // console.log("onmessage", event.data.pluginMessage);
    const message = event.data.pluginMessage;

    // get storage
    if (message.type === "get-json-settings-storage") {
      if (message.data) {
        setJSONConfig(message.data);
      }
    }

    // if app settings detected
    if (message.type === "get-app-settings-storage") {
      // console.log("get app settings", message.data);
      if (message.data) {
        console.log("app settings", message.data);
        setAppConfig(message.data);
      }
    }

    // if image detected
    if (message.type === "image-url") {
      // console.log("image-url", message.url, appConfig.proxy);

      fetchImagefromURL(
        message.url,
        message.targetID,
        appConfig.svgScale,
        message.index,
        appConfig.proxy
      );
    }

    setStorageStatus("empty");
  };

  //////////////////////////
  // USE EFFECTS ///////////
  //////////////////////////

  React.useEffect(() => {
    parent.postMessage(
      { pluginMessage: { type: "get-json-settings-storage" } },
      "*"
    );

    parent.postMessage(
      { pluginMessage: { type: "get-app-settings-storage" } },
      "*"
    );
  }, []);

  // Handle messages from figma
  React.useEffect(() => {
    window.onmessage = (event) => {
      handleOnMessage(event);
    };
  }, [appConfig.svgScale, appConfig.proxy]);

  useEffectAfterMount(() => {
    if (showAppSettings) {
      parent.postMessage(
        { pluginMessage: { type: "change-size", frameHeight: 580 } },
        "*"
      );
    } else {
      parent.postMessage(
        {
          pluginMessage: {
            type: "initial-size",
            isTrial: daysLeft > 0,
          },
        },
        "*"
      );
    }
  }, [showAppSettings]);

  useEffectAfterMount(() => {
    // apply dark mode
    if (appConfig.darkMode) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  }, [appConfig.darkMode]);

  //////////////////////////
  // RENDER ////////////////
  //////////////////////////

  const handleUIState = () => {
    // console.log(storageStatus, JSONconfig);
    if (showAppSettings) {
      return (
        <SettingsView
          onBackClick={() => setShowAppSettings(false)}
          settings={appConfig}
          onSettingsChange={(newSettings) => {
            console.log("new settings", newSettings);

            setAppConfig(newSettings);

            parent.postMessage(
              {
                pluginMessage: {
                  type: "set-app-settings-storage",
                  data: newSettings,
                },
              },
              "*"
            );
          }}
        />
      );
    }

    if (storageStatus === "loading" && !JSONconfig) {
      return <LoadingView />;
    }

    if (storageStatus === "empty" && !JSONconfig) {
      return (
        <LaunchView
          urlOnClick={fetchUrlLink}
          fileOnChange={handleUploadLocalFile}
          onSettingsClick={() => setShowAppSettings(true)}
          daysLeft={daysLeft}
        />
      );
    }

    if (JSONconfig) {
      return (
        <OperationsView
          JSONconfig={JSONconfig}
          appConfig={appConfig}
          onRejectClick={onRejectClick}
        />
      );
    }
  };

  return handleUIState();
};

export default App;
