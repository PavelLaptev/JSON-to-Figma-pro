// import proxyServer from "./proxyServer";

export default async function fetchImagefromURL(
  url,
  targetID,
  svgScale: number,
  index: number,
  proxyServer: string
) {
  // console.log("fetchImagefromURL", url, targetID, svgScale, index, proxyServer);

  fetch(`${proxyServer}${encodeURIComponent(url)}`)
    .then((res) => {
      return res.blob();
    })
    .then((blob) => {
      const blobImg = URL.createObjectURL(blob);
      const isFileSVG = blob.type.includes("svg");

      // convert blobl to png
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.src = blobImg;
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
        // ctx.drawImage(img, 0, 0);
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
                  index: index,
                },
              },
              "*"
            );
          };
        }, "image/png");
      };
    });
}
