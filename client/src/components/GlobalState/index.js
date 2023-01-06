import { useState, useEffect, createContext } from "react";
import UserAPI from "~/apis/userAPI";
import ProductAPI from "~/apis/productAPI";
import CategoryAPI from "~/apis/categoryAPI";
import * as httpRequest from "~/utils/httpRequest";

export const GlobalState = createContext();

export default function DataProvider({ children }) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const userLogin = localStorage.getItem("userLogin");
    if (userLogin) {
      //Refresh token
      const refreshToken = async () => {
        try {
          const token = await httpRequest.get("/user/refreshtoken");

          setToken(token.accessToken);
          setTimeout(() => refreshToken(), 25000);
        } catch (error) {
          throw new Error(error);
        }
      };

      refreshToken();
    }
    //
  }, []);

  const state = {
    token: [token, setToken],
    products: ProductAPI(),
    user: UserAPI({ token }),
    ...CategoryAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
}
