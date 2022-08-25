import { createContext, useEffect, useState } from "react";
import { ProductAPI } from "~/api";
import * as httpRequest from "~/utils/httpRequest";
import axios from "axios";
export const GlobalState = createContext();

const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  useEffect(() => {
    (async () => {
      const response = await httpRequest.get("/user/refreshtoken");

      console.log(response);
    })();
  }, []);
  const state = {
    token: [token, setToken],
    productsAPI: ProductAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

export default DataProvider;
