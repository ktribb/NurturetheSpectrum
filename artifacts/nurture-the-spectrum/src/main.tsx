import { createRoot } from "react-dom/client";
import { setAuthTokenGetter } from "@workspace/api-client-react";
import { getAdminToken } from "@/lib/admin-auth";
import App from "./App";
import "./index.css";

// Wire up admin token so all API requests carry it in Authorization header
setAuthTokenGetter(() => getAdminToken());

createRoot(document.getElementById("root")!).render(<App />);
