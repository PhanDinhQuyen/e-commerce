import * as httpRequest from "~/utils/httpRequest";
import errorInfor from "~/utils/errorInfor";

import { useState, useEffect } from "react";

export default function UserAPI({ token }) {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
    }

    //Get user
    (async () => {
      try {
        const data = await httpRequest.get(`/user/infor`, {
          headers: { Authorization: token },
        });
        setIsLogin(true);
        setIsAdmin(data.role === Number(process.env.REACT_APP_ROLE_ADMIN));
      } catch (error) {
        console.log(error);
        errorInfor(error);
      }
    })();
    //
  }, [token]);
  return {
    login: [isLogin, setIsLogin],
    admin: [isAdmin, setIsAdmin],
  };
}
