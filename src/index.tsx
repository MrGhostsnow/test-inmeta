import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./contexts/auth";

const rootElement = document.getElementById("root");
const root = rootElement ? ReactDOM.createRoot(rootElement) : undefined;

if (root) {
  root.render(
    <React.StrictMode>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </React.StrictMode>
  );
}

reportWebVitals();
