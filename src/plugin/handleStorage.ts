const pluginName = "JSONtoFigmaPlugin";
const JSONStorageSection = `${pluginName}-json-settings`;
const appStorageSection = `${pluginName}-app-settings`;

export const handleStorage = (msg: any) => {
  // CLEAN STORAGE
  // figma.clientStorage.setAsync(pluginName, null);

  // JSON SETTINGS
  if (msg.type === "set-json-settings-storage") {
    figma.clientStorage.setAsync(JSONStorageSection, JSON.stringify(msg.data));
  }

  if (msg.type === "get-json-settings-storage") {
    figma.clientStorage.getAsync(JSONStorageSection).then((data) => {
      figma.ui.postMessage({
        type: "get-json-settings-storage",
        data: JSON.parse(data) as JSONconfigType,
      });
    });
  }

  if (msg.type === "clear-json-settings-storage") {
    figma.clientStorage.setAsync(JSONStorageSection, null);
  }

  // APP SETTINGS
  if (msg.type === "set-app-settings-storage") {
    // console.log("set-app-settings-storage", msg);
    figma.clientStorage.setAsync(appStorageSection, JSON.stringify(msg.data));
  }

  if (msg.type === "get-app-settings-storage") {
    figma.clientStorage.getAsync(appStorageSection).then((data) => {
      figma.ui.postMessage({
        type: "get-app-settings-storage",
        data: JSON.parse(data) as appConfigType,
      });
    });
  }
};
