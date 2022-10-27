import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./components/GlobalStyle";
import DataProvider from "./components/GlobalState";
import App from "./App";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GlobalStyle>
      <DataProvider>
        <ToastContainer
          position='top-right'
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          style={{ zIndex: "10000000" }}
          draggable
          theme='dark'
        />
        <Router>
          <App />
        </Router>
      </DataProvider>
    </GlobalStyle>
  </React.StrictMode>
);
