import { useEffect, useState } from "react";
import httpRequest from "~/utils/httpRequest";

export default function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!token) return;
    const getUser = async () => {
      try {
        const response = await httpRequest.get("/user/infor", {
          headers: { Authorization: token },
        });
        setIsLogged(true);
        setIsAdmin(
          response.data.role === Number(process.env.REACT_APP_ROLE_ADMIN)
        );
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    getUser();
  }, [token]);
  return {
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
  };
}
