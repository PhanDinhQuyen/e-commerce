import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GlobalStyle from "./components/GlobalStyle";
import DataProvider from "./components/GlobalState";

const LazyApp = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));

const optionsToast = {
  position: "top-right",
  autoClose: 10000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  style: { zIndex: "99999" },
  draggable: true,
  theme: "dark",
};

root.render(
  <React.StrictMode>
    <GlobalStyle>
      <DataProvider>
        <ToastContainer {...optionsToast} />
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <LazyApp />
          </Suspense>
        </Router>
      </DataProvider>
    </GlobalStyle>
  </React.StrictMode>
);
