import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthProvider";
import { GlobalProvider } from "./context/global/GlobalProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GlobalProvider>
  </React.StrictMode>
);
