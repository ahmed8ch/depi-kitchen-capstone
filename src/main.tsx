import "@kitlangton/rolling-number/styles.css";
import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProviders } from "@/app/providers";

const rootElement = document.querySelector("#root");
if (!rootElement) {
  throw new Error("Root mount element #root was not found.");
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>,
);
