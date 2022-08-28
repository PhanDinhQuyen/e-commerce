import { createContext, useEffect, useState } from "react";
import { ProductAPI, UserAPI } from "~/api";
import * as httpRequest from "~/utils/httpRequest";
export const GlobalState = createContext();

const DataProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const refreshToken = async () => {
    const token = await httpRequest.get("/user/refreshtoken");

    setToken(token.accessToken);
  };

  useEffect(() => {
    const userLogin = localStorage.getItem("userLogin");
    if (userLogin) refreshToken();
  }, []);

  const state = {
    token: [token, setToken],
    productsAPI: ProductAPI(),
    userAPI: UserAPI(token),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

export default DataProvider;
