import { proxyServer } from "./proxyServer";
import showMsg from "./showFigmaMsg";

export default async function fetchFromURL(url) {
  const encodedURL = encodeURI(url);
  const response = await fetch(`${proxyServer}${encodedURL}`);

  if (!response.ok) {
    console.error("Error fetching from URL", response);
    showMsg("🚨 Error fetching from URL");
  }

  return response.json();
}
