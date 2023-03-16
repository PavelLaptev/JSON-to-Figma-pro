import { proxyServer } from "./proxyServer";
import showMsg from "./showFigmaMsg";

export default async function fetchFromURL(url) {
  const response = await fetch(`${proxyServer}${url}`);

  if (!response.ok) {
    console.error("Error fetching from URL", response);
    showMsg("🚨 Error fetching from URL");
  }

  return response.json();
}
