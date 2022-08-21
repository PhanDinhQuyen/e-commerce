import React from "react";
import ReactDOM from "react-dom/client";

import { GlobalStyle } from "./components";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle>
      <Router>
        <App />
      </Router>
    </GlobalStyle>
  </React.StrictMode>
);
