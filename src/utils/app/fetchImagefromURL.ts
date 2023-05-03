import { proxyServer } from "./proxyServer";

export default async function fetchImagefromURL(
  url,
  targetID,
  svgScale: number
) {
  fetch(`${proxyServer}${url}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Network response was not ok.");
      }
    })
    .then((data) => {
      const base64Data = data.contents;
      console.log("data", data);
      const isFileSVG = url.includes(".svg");

      // convert blobl to png
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.src = base64Data;
      img.onload = () => {
        // set canvas size
        if (isFileSVG) {
          // resize canvas to svg size
          canvas.width = img.width * svgScale;
          canvas.height = img.height * svgScale;
          ctx.drawImage(img, 0, 0, img.width * svgScale, img.height * svgScale);
        } else {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
        }

        // draw image
        canvas.toBlob((blob) => {
          // blob to arrayBuffer
          const reader = new FileReader();
          reader.readAsArrayBuffer(blob);
          reader.onloadend = () => {
            const arrayBuffer = reader.result;
            const uint8Array = new Uint8Array(arrayBuffer as ArrayBuffer);

            parent.postMessage(
              {
                pluginMessage: {
                  type: "imgData",
                  data: uint8Array,
                  targetID: targetID,
                },
              },
              "*"
            );
          };
        }, "image/png");
      };
    });
}
