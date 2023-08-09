import isValidURL from "./isValidURL";
import showMsg from "./showFigmaMsg";

export default async function fetchFromURL(url, proxyServer) {
  console.log("fetchFromURL", url, proxyServer);

  // check if the url is valid
  if (!isValidURL(url)) {
    console.error("URL is not valid", url);
    showMsg("🚨 URL is not valid. Check the console for details.");
  }

  const response = await fetch(`${proxyServer}${url}`);

  if (!response.ok) {
    console.error("Error fetching from URL", response);
    showMsg("🚨 Error fetching from URL. Check the console for details.");
  }

  return response.json();
}
