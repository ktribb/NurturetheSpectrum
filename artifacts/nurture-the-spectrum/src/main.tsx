import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { setBaseUrl } from "@workspace/api-client-react";

// In production, VITE_API_URL points to the deployed API server.
// In Replit dev, leave it unset and the browser will use relative paths.
const apiUrl = import.meta.env.VITE_API_URL ?? "";
if (apiUrl) {
  setBaseUrl(apiUrl);
}

createRoot(document.getElementById("root")!).render(<App />);
