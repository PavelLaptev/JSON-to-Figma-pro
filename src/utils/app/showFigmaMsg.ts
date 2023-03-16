export default function showFigmaMsg(text: string) {
  parent.postMessage(
    {
      pluginMessage: {
        type: "showMsg",
        text: text,
      },
    },
    "*"
  );
}
