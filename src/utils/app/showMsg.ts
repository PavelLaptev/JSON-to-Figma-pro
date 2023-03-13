import { msgTypes } from "../../dataConfig";

export default function showMsg(type: string, text: string) {
  parent.postMessage(
    {
      pluginMessage: {
        type: "showMsg",
        notifyText: `${msgTypes[type].icon} ${text}`,
      },
    },
    "*"
  );
}
