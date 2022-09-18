import { useState, useEffect, createContext } from "react";

import ProductAPI from "~/apis/productAPI";
import UserAPI from "~/apis/userAPI";

import * as httpRequest from "~/utils/httpRequest";

export const GlobalState = createContext();

export default function DataProvider({ children }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      //Refresh token
      (async () => {
        try {
          const token = await httpRequest.get("/user/refreshtoken");

          setToken(token.accessToken);
        } catch (error) {
          throw new Error(error);
        }
      })();
    }
    //
  }, [token]);

  const state = {
    token: [token, setToken],
    products: ProductAPI(),
    user: UserAPI({ token }),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
}
