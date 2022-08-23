import { createContext, useState } from "react";
import { ProductAPI } from "~/api";
export const GlobalState = createContext();

function DataProvider({ children }) {
  const [token, setToken] = useState(false);
  const stateGlobal = {
    token: [token, setToken],
    productsAPI: ProductAPI(),
  };

  ProductAPI();
  return (
    <GlobalState.Provider value={stateGlobal}>{children}</GlobalState.Provider>
  );
}

export default DataProvider;
