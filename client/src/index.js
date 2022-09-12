import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";

import GlobalStyle from "./components/GlobalStyle";
import DataProvider from "./components/GlobalState";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GlobalStyle>
      <DataProvider>
        <Router>
          <App />
        </Router>
      </DataProvider>
    </GlobalStyle>
  </React.StrictMode>
);
